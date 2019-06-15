import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from './../component/nav/nav.js';
import Ftp from './../component/ftp/ftp.js';
import Login from './../component/login/login.js';
import Home from './../component/home/home.js';
import './../common/lib.js';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root">one</div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);

ReactDOM.render((
  <Router>
    <div>
      <Route path="/nav" component = { Nav } />
      <Route path="/ftp" component = { Ftp } />
      <Route path='/login' component = { Login }/>
      <Route path='/home' component = { Home }/>
    </div>
  </Router>
),document.getElementById('root')
);