import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import store from "./store/configureStore";
import theme from "./theme";
import history from "./history";

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <App/>
      </Router>
    </ThemeProvider>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
