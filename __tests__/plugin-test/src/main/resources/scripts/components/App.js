import React from "react";
import * as _ from "lodash";
import models from "../models";
import interpreter from "../interpreter";
import { evaluateObjectProperties } from "../interpreter";
import { calculateStateProjection } from "../reducer";
import { connect } from "react-redux"
import SummaryView  from "./SummaryView"
import SpeciesView  from "./SpeciesView"
import CareerView  from "./CareerView"
import AdvancementsView  from "./AdvancementsView"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
const Component = (props) => (
    <div id="test-app">
    <Tabs>
        <TabList>
            <Tab>
Summary
</Tab>
<Tab>
Species
</Tab>
<Tab>
Career
</Tab>
<Tab>
Advancements
</Tab>
        </TabList>
        <TabPanel>
<SummaryView/>
</TabPanel>
<TabPanel>
<SpeciesView/>
</TabPanel>
<TabPanel>
<CareerView/>
</TabPanel>
<TabPanel>
<AdvancementsView/>
</TabPanel>
    </Tabs>
    </div>
)
const isBoundComponent = false
const boundPropertyExpression = undefined; // The expression used to bind this component to the state.
const valuePropertyExpression = undefined; // The expression evaluated to determine the value of the component
const readOnly = true; // If this component only calculates its value, or is bound and can update it.
const optionsExpression = "";
const action = undefined;
const disabledWhenExpression = undefined;
const hiddenWhenExpression = undefined;
const selectionCountExpression = 0;
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