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