import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
ReactDom.render(
<StateProvider initialState={initialState} reducer={reducer}>
<App/>
</StateProvider>
,document.getElementById("root"));