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
            error: "There was an error in PresenceCharacteristics",
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

class PresenceCharacteristics extends React.Component {
    constructor(props){
            super(props);

            const updateDispatch = function(value){
                this.props.dispatch({ type: "SET", path: this.props.boundProperty, value});
            }.bind(this);

            this.update = function(event){
                if(isBoundComponent){
                    const value = Number.parseInt(event.target.value);
                    this.setState({
                        text: value
                    });
                    if(!this.props.maxSelection || this.props.maxSelection == 1 || value.length <= this.props.maxSelection) {
                    updateDispatch(value);
                    }
                }
            };
            this.update = this.update.bind(this);
        }
    render() {
        if(!this.props.hidden){
        return (
        <ErrorBoundary>
            <Textfield id="PresenceCharacteristics" label="Presence" type="number" value={this.props.value} onChange={this.update} />
        </ErrorBoundary>
        );
        } else {
            return null
        }
    }

    shouldComponentUpdate(nextProps){
        return this.props.value !== nextProps.value;
    }
}

const Component = PresenceCharacteristics;
const isBoundComponent = false
const boundProperty = "# $state.character.characteristics.presence "; // The expression used to determine the value of binding.
const readOnly = true; // If this component only calculates its value, or is bound and can update it.
const valueExpression = "";
const action = undefined;
const disabledWhenExpression = undefined;
const hiddenWhenExpression = undefined;
const selectionCountExpression = 0;
const connected = connect((state, ownProps) => {
    const context = {
        $state: calculateStateProjection(state),
        $model: models,
        $this: ownProps.value,
        $index: ownProps.index
    };
    const interpretedBoundProperty = interpreter.interpret(boundProperty, context);
    const value = (()=>{
            if (isBoundComponent){
                return _.get(context, interpretedBoundProperty);
            } else {
                return interpreter.interpret(interpretedBoundProperty, context);
            }
    })();
    const maxSelections = interpreter.interpret(selectionCountExpression, context);
    const options = (interpreter.interpret(valueExpression, context) || []).map(opt => {
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
    const clickAction = interpreter.interpret(action, context);
    return {
        clickAction,
        disabled,
        hidden,
        options,
        maxSelections,
        boundProperty: interpretedBoundProperty,
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

function renderOption(value) {
    return value.choices + " from " + value.options.join(", ");
}

export default connected;