import React from "react";
import ReactDOM from "react-dom";

import $ from 'jquery';
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";


import App from './App.jsx';


window.jQuery = $;
ReactDOM.render(
  <App />,
  document.getElementById("root")
);



