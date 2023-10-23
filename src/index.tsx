import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
