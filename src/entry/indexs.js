import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './../component/login/login.js';
import Logins from './../component/logins/logins.js';
import Home from './../component/home/home.js';
import Homes from './../component/homes/homes.js';
import User from './../component/user/user.js';
import Detail from './../component/user/detail.js';
import JobSource from './../component/jobsource/jobsource.js';
import ChannelList from './../component/jobsource/channellist/channellist.js';
import JobWorkOrder from './../component/jobworkorder/jobworkorder.js';
import ChannelCommissionList from './../component/channelcommissionlist/channelcommissionlist.js';
import CommissionDetail from './../component/channelcommissionlist/commissiondetail/commissiondetail.js';
import ChannelManage from './../component/channelmanage/channelmanage.js';
import ExtendDetail from './../component/channelmanage/extenddetail.js';
import Cashout from './../component/cashout/cashout.js';
import AuditedCashout from './../component/cashout/auditedcashout.js';
import RejectCashout from './../component/cashout/rejectcashout.js';
import Tag from './../component/tag/tag.js';
import './../common/lib.js';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="roots"></div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);


ReactDOM.render(
  (
  <Router>
    <div>
        <div className="content-container">
          <Route path='/dsq/dm/project' component = { Logins }/>
          <Route path='/home/homelists' component = { JobSource }/>
        </div>
    </div>
  </Router>
),document.getElementById('roots')
);