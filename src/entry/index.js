import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import Login from './../component/login/login.js';
import Home from './../component/home/home.js';
import User from './../component/user/user.js';
import Detail from './../component/user/detail.js';
import JobSource from './../component/jobsource/jobsource.js';
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
    <Route path='/home' component = { Home } />
      <Route path='/login' component = { Login }/>
        <div className="content-container">
          <div className="breadcrumb">
              <Breadcrumb>
                  <Breadcrumb.Item key="user-manage">用户管理</Breadcrumb.Item>
                  <Breadcrumb.Item key="user-list">用户列表</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <Route path='/home/user' component = { User }/>
          <Route path='/home/detail' component = { Detail }/>
          <Route path='/home/jobsource' component = { JobSource }/>
        </div>
    </div>
  </Router>
),document.getElementById('root')
);