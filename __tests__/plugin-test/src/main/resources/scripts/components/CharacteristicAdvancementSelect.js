import React from "react";
import * as _ from "lodash";
import models from "../models";
import interpreter from "../interpreter";
import { evaluateObjectProperties } from "../interpreter";
import { calculateStateProjection } from "../reducer";
import { connect } from "react-redux"
import Checkbox from "@material-ui/core/Checkbox";
import Textfield from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error){
        return {
            error: "There was an error in characteristicAdvancement",
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo){
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>{this.state.error}</h1>;
        }

        return this.props.children;
      }
}

function translateValueForRender(value, context){
    if (_.isArray(value)) {
        return value.map(translateValueForRender).join(", ");
    } else if (_.isObject(value)){
        if (value.options && value.choices) {
            return renderOption(value);
        } else {
            return _.get(value, itemTextPath);
        }
    } else {
        return interpreter.interpret(value, context);
    }
}

class characteristicAdvancement extends React.Component {
    constructor(props){
        super(props);

        this.update = function(event){
            var value = event.target.value;
            if(!this.props.maxSelections || (!_.isArray(value) && this.props.maxSelections === 1) || value.length <= this.props.maxSelections) {
                this.props.dispatch({ type: "SET", path: this.props.boundProperty, value});
            }
        }

        this.update = this.update.bind(this);
        this.isItemDisabled = function(item) {
            if(_.isArray(listItemDisabledExpression)) {
                return listItemDisabledExpression.reduce((currentValue, nextSubExpression) => {
                    const context = {...this.props.context, $this: item};
                    context.$this.accumulator = currentValue;
                    return interpreter.interpret(nextSubExpression, context);
                }, undefined) || false;
            } else {
                return interpreter.interpret(listItemDisabledExpression, {...this.props.context, $this: item}) || false;
            }
        }
        this.isItemDisabled = this.isItemDisabled.bind(this);
        this.renderValue = value => {
            const extractedValue = itemTextPath ? _.get(value, itemTextPath) : value;
            if (valueDisplayExpression) {
                if (_.isArray(extractedValue)) {
                    return translateValueForRender(extractedValue.map(ev => {
                        const localContext = {... this.props.context, ...{
                            $this: ev
                        }};
                        return interpreter.interpret(valueDisplayExpression, localContext);
                    }));
                }
                const localContext = {... this.props.context,
                    $this: extractedValue
                };
                return translateValueForRender(interpreter.interpret(valueDisplayExpression, localContext), {... this.props.context, $this: extractedValue});
            } else {
                return translateValueForRender(extractedValue, {... this.props.context, $this: extractedValue});
            }
        }
        this.renderValue = this.renderValue.bind(this);

        this.renderItems = () => this.props.options.map((item, index) => {
            const itemDisabled = this.isItemDisabled(item);
            return (<MenuItem value={item} disabled={itemDisabled} >
                {
                    [_.get(item, itemTextPath, item)].map(prop => {
                        if(valueDisplayExpression) {
                            const localContext = {... this.props.context, ...{
                                $this: item
                            }};
                            return translateValueForRender(interpreter.interpret(valueDisplayExpression, localContext), localContext);
                        }
                    return translateValueForRender(prop, {...this.props.context, $this: prop});
                    })[0]
                }
            </MenuItem>)
        })
    }
    render(){
        if(!this.props.hidden){
        return (
        <ErrorBoundary>
        <FormControl fullWidth={true}>
                    <InputLabel id="characteristicAdvancement-label"></InputLabel>
                    <Select id="characteristicAdvancement" autoWidth={true} value={this.props.value} onChange={this.update}
                        renderValue={this.renderValue} multiple={this.props.maxSelections > 1} disabled={this.props.disabled}
                        children={this.renderItems()}
                    />
                </FormControl>
                </ErrorBoundary>)
        } else {
            return null
        }
    }

    shouldComponentUpdate(nextProps){
        return this.props.value !== nextProps.value ||
            this.props.options !== nextProps.options || this.props.disabled !== nextProps.disabled;
    }
}

const itemTextPath = 'option';
const valueDisplayExpression = undefined;
const Component = characteristicAdvancement;
const listItemDisabledExpression = JSON.parse(_.unescape("null"));
const isBoundComponent = true
const boundPropertyExpression = "$state.selectedAdvancement.characteristic"; // The expression used to bind this component to the state.
const valuePropertyExpression = undefined; // The expression evaluated to determine the value of the component
const readOnly = false; // If this component only calculates its value, or is bound and can update it.
const optionsExpression = "# $state.availableAdvancements.characteristic.options";
const action = undefined;
const disabledWhenExpression = undefined;
const hiddenWhenExpression = undefined;
const selectionCountExpression = 1;
const connected = connect((state, ownProps) => {
    const context = {
        $state: calculateStateProjection(state),
        $model: models,
        $this: ownProps.value ? ownProps.value : {},
        $index: ownProps.index,
        $temp: calculateStateProjection(state).$temp,
        $parent: ownProps.parent
    };
    const propertyPathAsString = interpreter.interpret(boundPropertyExpression, context);
    if(propertyPathAsString !== undefined && !_.isString(propertyPathAsString)) {
        throw new Error("property path was defined but was " + typeof propertyPathAsString + " instead of a string");
    }
    const propertyPathAsArray = _.toPath(propertyPathAsString);
    const lastPropertyName = propertyPathAsArray[propertyPathAsArray.length-1];
    _.set(context, "$this.path", propertyPathAsString);
    const rawParentValue = _.get(context, propertyPathAsArray.slice(0, -1));
    const parentValue = _.isArray(rawParentValue) ? rawParentValue : _.isNil(rawParentValue)
        ? null : evaluateObjectProperties(context, rawParentValue);
    const value = !_.isNil(valuePropertyExpression) ? interpreter.interpret(valuePropertyExpression, context)
        : _.isNil(parentValue) ? null
        : parentValue[lastPropertyName];
    const maxSelections = interpreter.interpret(selectionCountExpression, context);
    const options = (interpreter.interpret(optionsExpression, context) || []).map(opt => {
        if(_.isArray(opt)){
            return opt.map(evaluateObjectProperties.bind(null, context));
        } else if(_.isObject(opt)) {
            return evaluateObjectProperties(context, opt);
        } else {
            return opt;
        }
    });
    const disabled = interpreter.interpret(disabledWhenExpression, context);
    const hidden = interpreter.interpret(hiddenWhenExpression, context);
    const clickAction = [interpreter.interpret(action, context)].map(opt => {
        if(_.isArray(opt)){
            return opt.map(evaluateObjectProperties.bind(null, context));
        } else if(_.isObject(opt)) {
            return evaluateObjectProperties(context, opt);
        } else {
            return opt;
        }
    })[0];
    return {
        context,
        clickAction,
        disabled,
        hidden,
        options,
        maxSelections,
        boundProperty: propertyPathAsString,
        value: _.isNil(value) ? "" : value
    };
}, (dispatch) => {
    return {dispatch};
})(Component);

function determineValues(expression, state, value){
    if (!expression){
        return [];
    }
    const expressionTokens = expression.split(".");
    switch(expressionTokens[0]){
        case "model":
            return _.get(models, expressionTokens.slice(1).join("."));
        case "character":
            return _.get(state, expression, []);
    }
}

function evaluateValueExpression(expression, context) {

}

function renderOption(value) {
    return value.choices + " from " + value.options.join(", ");
}

export default connected;