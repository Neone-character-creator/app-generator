import ReactDOM from "react-dom";
import App from "./components/App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {whyDidYouUpdate} from "why-did-you-update";
import reducer from "./reducer";
import React from "react";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {PersistGate} from 'redux-persist/integration/react'

const persistedReducer = persistReducer({
    key: 'root',
    storage,
    blacklist: ["$temp"]
}, reducer);

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);
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
                character: window.character()
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
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
    , document.getElementById("app"));

export {store};