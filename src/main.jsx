import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "stores/store";
import UserBroadcastChannel from "./UserBroadcastChannel";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <UserBroadcastChannel />
      <App />
    </Provider>
  // </StrictMode>
);
