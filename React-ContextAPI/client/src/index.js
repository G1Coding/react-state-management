import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { OrderContextProvider } from "./context/OrderContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </React.StrictMode>
);

reportWebVitals();
