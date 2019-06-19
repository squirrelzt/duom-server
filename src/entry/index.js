import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './../component/login/login.js';
import Home from './../component/home/home.js';
import User from './../component/user/user.js';
import Detail from './../component/user/detail.js';
import JobSource from './../component/jobsource/jobsource.js';
import ChannelList from './../component/jobsource/channellist/channellist.js';
import JobWorkOrder from './../component/jobworkorder/jobworkorder.js';
import './../common/lib.js';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root"></div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);


ReactDOM.render(
  (
  <Router>
    <div>
      <Switch>
        <Route path='/login' component = { Login }/>
        <Route path='/' component = { Home } />
      </Switch>
        <div className="content-container">
          <Route path='/user/lists' component = { User }/>
          <Route path='/user/list/detail/:id' component = { Detail }/>
          <Route path='/job/channel' component = { JobSource }/>
          <Route path='/job/list/basicinfo/:id' component = { ChannelList }/>
          <Route path='/workorder/manage' component = { JobWorkOrder }/>
        </div>
    </div>
  </Router>
),document.getElementById('root')
);