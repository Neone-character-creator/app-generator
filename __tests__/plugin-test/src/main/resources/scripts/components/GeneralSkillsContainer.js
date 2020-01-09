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
import AstrogationContainer from './AstrogationContainer';
import AthleticsContainer from './AthleticsContainer';
import CharmContainer from './CharmContainer';
import CoercionContainer from './CoercionContainer';
import ComputersContainer from './ComputersContainer';
import CoolContainer from './CoolContainer';
import CoordinationContainer from './CoordinationContainer';
import DeceptionContainer from './DeceptionContainer';
import DisciplineContainer from './DisciplineContainer';
import LeadershipContainer from './LeadershipContainer';
import MechanicsContainer from './MechanicsContainer';
import MedicineContainer from './MedicineContainer';
import NegotiationContainer from './NegotiationContainer';
import PerceptionContainer from './PerceptionContainer';
import PilotingPlanetaryContainer from './PilotingPlanetaryContainer';
import PilotingSpaceContainer from './PilotingSpaceContainer';
import ResilienceContainer from './ResilienceContainer';
import SkulduggeryContainer from './SkulduggeryContainer';
import StealthContainer from './StealthContainer';
import StreetwiseContainer from './StreetwiseContainer';
import SurvivalContainer from './SurvivalContainer';
import VigilanceContainer from './VigilanceContainer';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error){
        return {
            error: "There was an error in generalSkills",
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

const defaultStyle = {
    border: 0
};

class generalSkills extends React.Component {
    render(){
        if(!this.props.hidden){
            return (<ErrorBoundary>
                <Grid id="generalSkills" style={defaultStyle} container spacing={8} justify="space-around" direction={"vertical" == "vertical" ? "column" : "row"}>
                    <Grid item xs={12}>
<AstrogationContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<AthleticsContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<CharmContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<CoercionContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<ComputersContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<CoolContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<CoordinationContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<DeceptionContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<DisciplineContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<LeadershipContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<MechanicsContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<MedicineContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<NegotiationContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<PerceptionContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<PilotingPlanetaryContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<PilotingSpaceContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<ResilienceContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<SkulduggeryContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<StealthContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<StreetwiseContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<SurvivalContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
<Grid item xs={12}>
<VigilanceContainer value={this.props.value} index={this.props.index} parent={this.props}/>
</Grid>
                </Grid>
            </ErrorBoundary>);
        } else {
            return null
        }
    }

    shouldComponentUpdate(nextProps){
        return this.props.hidden !== nextProps.hidden ||
            this.props.index !== nextProps.index ||
            this.props.value !== nextProps.value;
    }
}

const Component = generalSkills;
const isBoundComponent = false
const boundPropertyExpression = undefined; // The expression used to bind this component to the state.
const valuePropertyExpression = "#$this"; // The expression evaluated to determine the value of the component
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