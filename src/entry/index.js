import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './../component/login/login.js';
import Loginx from './../component/loginx/loginx.js';
import Home from './../component/home/home.js';
import Homex from './../component/homex/homex.js';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root"></div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);

function requireAuth(nextState, replace) {
  console.log('-------------------');
}
function requireAuthx(nextState, replace) {
  console.log('====================');
}
ReactDOM.render(
  (
  <Router>
    <div>
      <Switch>
        <Route path='/lqgc/dm/project' component = { Login }/>
        <Route path='/bs1010/dm/project' component = { Loginx }/>
        <Route path='/home' component = { Homex } onEnter={requireAuthx}/>
        <Route path='/' component = { Home } onEnter={requireAuth}/>
      </Switch>
       
    </div>
  </Router>
),document.getElementById('root')
);