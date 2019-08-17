# app-generator
Creates a NEOne character creator webapp scaffold from a configuration file.

### Requires
 * Node
 * Gradle
 
### Configuration file structure
The app configuration file has the following elements:
1. `appName` The name of the app.
2. `views` The different pages of the app.
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
        * direction - The direction that the component aligns their children, either `vertical` or `horizontal`
        * children - Array of definitions of child components
        * label - An optional text label on the component.
* textfield - A `textfield` is a component that can display text and possibly allow editing text.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `textfield` can change the bound property.
        * value - The value displayed by this component. When set, this component is read-only. Scriptable. 
* number - A `number` is a component that can display a number and possibly allow editing the value.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `number` can change the bound property.
        * value - The value displayed by this component. When set, this component is read-only. Scriptable.
* checkbox - A `checkbox` is a component that can display a boolean value and possibly allow editing the value.
    * properties
        * label - A text label displayed on the component.
        * bind - The property on the state bound to this component. When bound, the `checkbox` can change the bound property.
        * value - The value displayed by this component. When set, this component is read-only. Scriptable.
* label - A `label` is a component to display text.
    * properties
        * text - The text to display
        
#### Configuring Model
The model configuration defines the structure and values of the state.

A model must define, at minimum, a type called `character`.

Each model definition must have a `properties` object, the properties that the model property has, which contains the name of each property as keys and a property configuration.

The configuration may be either a string or object. As a string, the string is the type of the property and the defaults for that property are used.

The following basic types are supported
* `string`
* `number`
* `boolean`
* `array`

In addition, a property can have a type of any custom type defined within the model section.

When defined with an object, the object can have the following properties:
* type - The string type of the property.
* derivedFrom - An array of expressions used to calculate this property value.
* baseValue - An array of expressions used to calculate the base property value, before user modifications.

Models may have a `values` array. This contains a set of defined instances of the model.

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