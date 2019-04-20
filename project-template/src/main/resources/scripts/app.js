import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore((state = {}) => state);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("app"));
