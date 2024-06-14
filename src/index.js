import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
// redux-saga
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { CookiesProvider } from "react-cookie";
import configureStore from "./saga/store";
// main configuration
import App from "./containers/App";
import "./assets/css/tailwind.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";

const history = createBrowserHistory();
const store = configureStore({}, history);
const render = () => {
  getChainOptions().then((chainOptions) => {
    // console.log('chainOptions', chainOptions)
    ReactDOM.render(
      <CookiesProvider>
        <WalletProvider>
          {/* <React.StrictMode> */}
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <GoogleOAuthProvider clientId="80846055020-t2ktehe284s1uab1jt1219f0b2r9v7kc.apps.googleusercontent.com">
                <App />
              </GoogleOAuthProvider>
            </ConnectedRouter>
          </Provider>
          {/* </React.StrictMode> */}
        </WalletProvider>
      </CookiesProvider>,
      document.getElementById("root")
    );
  });
};
setTimeout(() => render(), 1200);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
