import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { whyDidYouUpdate } from "why-did-you-update";
import reducer from "./reducer";
import React from "react";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
if (process.env.DEBUG) {
    whyDidYouUpdate(React);
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("app"));
