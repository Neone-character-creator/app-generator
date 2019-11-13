import ReactDOM from "react-dom";
import App from "./components/App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {whyDidYouUpdate} from "why-did-you-update";
import reducer from "./reducer";
import React from "react";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
window.character = function (stringifiedState) {
    if (stringifiedState === undefined) {
        return store.getState().character;
    } else {
        store.dispatch({
            type: "OVERRIDE",
            state: JSON.parse(stringifiedState)
        });
    }
};
window.addEventListener("message", function (event) {
    switch (event.data.action) {
        case "get-character":
            event.source.postMessage({
                action: "get-character",
                character: window.character(),
                correlationId: event.data.correlationId
            }, event.origin);

            break;
        case "set-character":
            window.character(event.data.character);
    }
});
if (process.env.HAS_PDF === true) {
    window.export = function () {
        return store.getState();
    };
}
if (process.env.NODE_ENV === "perf") {
    whyDidYouUpdate(React);
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("app"));

export {store};