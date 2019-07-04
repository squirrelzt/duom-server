import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import {breadcrumbconfig} from './breadcrumbconfig';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './../user/user.js';
import Detail from './../user/detail.js';
import JobSource from './../jobsource/jobsource.js';
import ChannelList from './../jobsource/channellist/channellist.js';
import SelectJobType from './../jobsource/channellist/create/SelectJobType.js';
import CreateJob from './../jobsource/channellist/create/CreateJob.js';
import JobWorkOrder from './../jobworkorder/jobworkorder.js';
import ChannelCommissionList from './../channelcommissionlist/channelcommissionlist.js';
import CommissionDetail from './../channelcommissionlist/commissiondetail/commissiondetail.js';
import ChannelManage from './../channelmanage/channelmanage.js';
import ExtendDetail from './../channelmanage/extenddetail.js';
import Cashout from './../cashout/cashout.js';
import AuditedCashout from './../cashout/auditedcashout.js';
import RejectCashout from './../cashout/rejectcashout.js';
import Tag from './../tag/tag.js';
import './../../entry/css/index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: "",
            defaultOpenKeys: [],
            asideVisibility: "visible",
            sectionMarginLeft: '240px',
            breadcrumbMarginLeft: '240px',
            contentContainerMarginLeft: '240px',
            menuFoldIconVisibility: 'visible',
            menuUnFoldIconVisibility: 'hidden'
        };
    }

    componentWillMount(){
      console.log(localStorage.token);
      if (!localStorage.token) {
        this.props.history.push(auth.getLoginUrl());
      }
    };

    onMenuFold = () => {
        this.setState({
            asideVisibility: 'hidden',
            sectionMarginLeft: '0',
            breadcrumbMarginLeft: '0',
            contentContainerMarginLeft: '0',
            menuFoldIconVisibility: 'hidden',
            menuUnFoldIconVisibility: 'visible'
        });
    }
    onMenuUnFold = () => {
        this.setState({
            asideVisibility: 'visible',
            sectionMarginLeft: '240px',
            breadcrumbMarginLeft: '240px',
            contentContainerMarginLeft: '240px',
            menuFoldIconVisibility: 'visible',
            menuUnFoldIconVisibility: 'hidden'
        });
    }
    logout = () => {
        localStorage.token = "";
        localStorage.userId = "";
        window.location.href=auth.getLoginUrl();
    }
    render() {
        let url = this.props.location.pathname;
        let breadcrumbItem = [];
        let urlArray = [];
        if (url.substr(0,1) == "/") {
            urlArray = url.replace("/", "").split("/");
        } else {
            urlArray = url.split("/");
        }
        if (urlArray[urlArray.length - 1] == "") {              //如果URL最后一个元素是/,即数组最后一个元素为空，则删掉
            urlArray.pop();
        }
        breadcrumbconfig.getBreadcrumbUrl().map(item => {
            let paramsUrl = "";
            for (let i = 0; i < item.params.length; i++) {
              paramsUrl += "/" + url[Number(item.catalog) + 1 + i]
            }
            if (urlArray[item.catalog] == item.key) {
                if (item.catalog == "0") {
                    breadcrumbItem.push(
                        <Breadcrumb.Item key = {item.key}>{item.name}</Breadcrumb.Item>
                      );
                } else {
                    breadcrumbItem.push(
                        <Breadcrumb.Item key = {item.key}>
                          <Link to = {item.path + paramsUrl}>{item.name}</Link>
                        </Breadcrumb.Item>
                    );
                }
                
            }
          });
          this.state.currentPage = urlArray[1];
          if ((this.state.currentPage == "list" && urlArray[0] == "user") || this.state.currentPage == "lists") {
            this.state.defaultOpenKeys.push("user-manage-menu");
            this.state.currentPage = "lists";
          } else if (this.state.currentPage == "channel") {
            this.state.defaultOpenKeys.push("job-resource-manage");
          } else if (urlArray[0] == "job" && this.state.currentPage == "list") {
            this.state.currentPage = "channel";
            this.state.defaultOpenKeys.push("job-resource-manage");
          } else if (this.state.currentPage == "extendlists") {
            this.state.defaultOpenKeys.push("channel-manage");
          } else if (urlArray[0] == "extend" && this.state.currentPage == "extendlist") {
            this.state.currentPage = "extendlists";
            this.state.defaultOpenKeys.push("channel-manage");
          } else if (this.state.currentPage == "commissionlists") {
            this.state.defaultOpenKeys.push("channel-commission-list");
          } else if (urlArray[0] == "channelcommission" && this.state.currentPage == "commissionlist") {
            this.state.currentPage = "commissionlists";
            this.state.defaultOpenKeys.push("channel-commission-list");
          } else if (this.state.currentPage == "cashoutlists" || this.state.currentPage == "auditedcashoutlists" || this.state.currentPage == "rejectcashoutlists") {
            this.state.defaultOpenKeys.push("commission-withdraw-list");
          } else if (this.state.currentPage == "taglists") {
            this.state.defaultOpenKeys.push("job-tag-manage");
          }
        return (
            <div>
            <div id="home-container">
                <aside style={{visibility: this.state.asideVisibility}}>
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          selectedKeys={[this.state.currentPage]}
                          defaultOpenKeys={this.state.defaultOpenKeys}>
                        <SubMenu key="user-manage-menu"
                                title={
                                    <span>
                                        <Icon type="team"></Icon>
                                        <span>用户管理</span>
                                    </span>
                                }>
                            <Menu.Item key="lists"><Link to="/user/lists">用户列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="job-resource-manage"
                                title={
                                    <span>
                                        <Icon type="apartment"></Icon>
                                        <span>任务来源渠道管理</span>
                                    </span>
                                }>
                            <Menu.Item key="channel"><Link to="/job/channel">渠道列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="channel-manage"
                                title={
                                    <span>
                                        <Icon type="table"></Icon>
                                        <span>用户推广渠道管理</span>
                                    </span>
                                }>
                            <Menu.Item key="extendlists"><Link to="/extend/extendlists">推广渠道列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="channel-commission-list"
                                title={
                                    <span>
                                        <Icon type="shopping-cart"></Icon>
                                        <span>用户推广渠道佣金列表</span>
                                    </span>
                                }>
                            <Menu.Item key="commissionlists"><Link to="/channelcommission/commissionlists">佣金列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="commission-withdraw-list"
                                title={
                                    <span>
                                        <Icon type="export"></Icon>
                                        <span>佣金提现列表</span>
                                    </span>
                                }>
                                <Menu.Item key="cashoutlists"><Link to="/cashout/cashoutlists">提现列表</Link></Menu.Item>
                                <Menu.Item key="auditedcashoutlists"><Link to="/cashout/auditedcashoutlists">提现已审核列表</Link></Menu.Item>
                                <Menu.Item key="rejectcashoutlists"><Link to="/cashout/rejectcashoutlists">提现已拒绝列表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="job-tag-manage"
                                title={
                                    <span>
                                        <Icon type="project"></Icon>
                                        <span>任务标签管理</span>
                                    </span>
                                }>
                            <Menu.Item key="taglists"><Link to="/tag/taglists">标签列表</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </aside>
                <section style={{marginLeft:this.state.sectionMarginLeft}}>
                    <div className="menu-display">
                        <Icon className="menuFoldIcon" type="menu-fold" style={{visibility:this.state.menuFoldIconVisibility}} onClick={this.onMenuFold}/>
                        <Icon className="menuUnFoldIcon" type="menu-unfold" style={{visibility: this.state.menuUnFoldIconVisibility}} onClick={this.onMenuUnFold}/>
                        <div className="logout">
                            <span>当前用户: {localStorage.userId}</span>
                            <Button type="primary" size="small" className="logout-btn" onClick={this.logout}><Icon type="logout"/>退出系统</Button>
                        </div>
                    </div>
                </section>
                <div className="breadcrumb" style={{marginLeft:this.state.breadcrumbMarginLeft}}>
                    <Breadcrumb>
                        {breadcrumbItem}
                    </Breadcrumb>
                </div>
            </div>
            <div className="content-container" style={{marginLeft:this.state.contentContainerMarginLeft}}>
                <Route path='/user/lists' component = { User }/>
                <Route path='/user/list/detail/:id' component = { Detail }/>
                <Route path='/job/channel' component = { JobSource }/>
                <Route path='/job/list/basicinfo/:id' component = { ChannelList }/>
                <Route path='/job/lists/jobtype/:id' component = { SelectJobType }/>
                <Route path='/job/listsj/createjob/:id' component = { CreateJob }/>
                <Route path='/workorder/manage' component = { JobWorkOrder }/>
                <Route path='/channelcommission/commissionlists' component = { ChannelCommissionList }/>
                <Route path='/channelcommission/commissionlist/comissiondetail/:id' component = { CommissionDetail }/>
                <Route path='/extend/extendlists' component = { ChannelManage }/>
                <Route path='/extend/extendlist/extenddetail/:id' component = { ExtendDetail }/>
                <Route path='/cashout/cashoutlists' component = { Cashout }/>
                <Route path='/cashout/auditedcashoutlists' component = { AuditedCashout }/>
                <Route path='/cashout/rejectcashoutlists' component = { RejectCashout }/>
                <Route path='/tag/taglists' component = { Tag }/>
            </div>
            </div>
        )
    }
}

export default Home;