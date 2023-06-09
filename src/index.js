import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.withcredentials = true;
root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </CookiesProvider>
);

