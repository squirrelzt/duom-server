import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from './../component/nav/nav.js';
import Ftp from './../component/ftp/ftp.js';
import Login from './../component/login/login.js';
import Home from './../component/home/home.js';
import User from './../component/user/user.js';
import Detail from './../component/user/detail.js';
import './../common/lib.js';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root">one</div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);

const userSubCategory = ({ match }) => (
  <div className="content-container">
    <Route path="/home/user" component = { User }/>
  </div>
);

const userDetailCategory = ({ match }) => (
  <div className="content-container">
    <Route path="/home/detail" component = { Detail }/>
  </div>
);

ReactDOM.render((
  <Router>
    <div>
      <Route path="/nav" component = { Nav } />
      <Route path="/ftp" component = { Ftp } />
      <Route path='/login' component = { Login }/>
      <Route path='/home' component = { Home } />
      <Route path='/home/user' component = { userSubCategory }/>
      <Route path='/home/detail' component = { userDetailCategory }/>
    </div>
  </Router>
),document.getElementById('root')
);