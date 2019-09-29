# app-generator
Creates a NEOne character creator webapp scaffold from a configuration file.

### Requires
 * Node
 * Gradle
 
### Configuration file structure
The app configuration file has the following elements:
1. `appName` The name of the app.
2. `views` The different pages of the app. UI components are defined under here.
3. `model` Definitions of the model types used by the app.
4. `rules` Rules for advancement.
5. `hooks` Definitions for code to run when events occur within the app.

#### Configuring Views
The app configuration must have a `views` element as a property on the root element.

The view element must have the name "app" and a "children" array of child element, with each element being a component of `view` type.

#### Configuring Other Components
Components of the following types can exist.
* container - A `container` is a component which can contain and structure other components.
    * properties 
        * direction - The direction that the component aligns their children, either `vertical` or `horizontal`.
        * children - Array of definitions of child components.
        * label - An optional text label on the component.
        * border - Defines a style of border around the container.
* textfield - A `textfield` is a component that can display text and possibly allow editing text.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `textfield` can change the bound property. Mutually exclusive with `value`
        * value - The value displayed by this component. When set, this component is read-only. Mutually exclusive with `bind`.
        * weight - Optional value indicating how much space in the parent container.
* number - A `number` is a component that can display a number and possibly allow editing the value.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `number` can change the bound property. Mutually exclusive with `value`.
        * value - The value displayed by this component. When set, this component is read-only. Mutually exclusive with `value`.
        * weight - Optional value indicating how much space in the parent container.
* checkbox - A `checkbox` is a component that can display a boolean value and possibly allow editing the value.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `checkbox` can change the bound property. Mutually exclusive with `value`.
        * value - The value displayed by this component. When set, this component is read-only. Mutually exclusive with `value`.
        * weight - Optional value indicating how much space in the parent container.
* label - A `label` is a component to display text.
    * properties
        * text - The text to display.
        
#### Configuring Model
The model configuration defines the structure and values of the state.

A model must define, at minimum, a type called `character`.

Each model definition must have a `properties` object, which defines the properties that each model instance has, which contains the name of each property as keys and a property configuration.

The configuration may be either a string or object. As a string, the string is the type of the property and the defaults for that property are used.

The following basic types are supported
* `string`
* `number`
* `boolean`
* `array` by putting the name of another `[type]` in brackets

In addition, a property can have a type of any custom type defined within the model section.

When defined with an object, the object must have the following properties:
* type - The name of the type of the property.

It also may optionally have the following properties.
* derivedFrom - An array of expressions used to calculate this property value. When set, this value cannot be directly modified, it is only calculated
* baseValue - An array of expressions used to calculate the starting value of the property, before user modifications.

Models may have a `values` array. This contains a set of defined instances of the model.

Models can define `effects`. This is an object or array of objects defining state modification that are applied when model instances are added to the state.

#### Configuring rules
Enforcement of a portion of game rules.

The following rules can be implemented:
* `advancement` is rules for character advancement.
TODO: Finish

#### Hooks
Hooks are expressions that are evaluated when events occur.

Each hook definition contains properties:
* after - The type of the Redux event that the hook is run after resolving.
* before - The type of the  Redux event the the hook is run before resolving.
* when - An optional expression that causes the hook to only be run when it evaluated to true.
* effects - An array of expressions to evaluate when the hook runs.

#### Scripting
Many values can be scripted, meaning that they are calculated.

When a string contains a `#` as the first non-whitespace character, that indicates that the value should be interpreter.

An interpreted string is evaluated like any other javascript.

In this context, the following values are made available:
`$state` is the root object of the Redux state stree.
`$models` is an object containing all of the app model definitions. A particular model can be retrieved using it's name as a property on `$models`. 
* Each model definition contains
    * `values` is an array containing all predefined instances of the model.
    * `definition` is an object containing the schema definition object.
    * `effects` is an array or object of model instance effects.
