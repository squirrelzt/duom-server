import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import {breadcrumbconfig} from './breadcrumbconfig';
import $ from "jquery";

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            currentPage: "",
            defaultOpenKeys: []
        };
    }

    componentWillMount(){
      console.log(localStorage.token);
      if (localStorage.token == null) {
        this.props.history.push(auth.getLoginUrl());
      }
    };

    onMenuFold() {
        $('#home-container aside').css('visibility', 'hidden');
        $('#home-container section').css('margin-left', '0');
        $('#home-container > .breadcrumb').css('margin-left', '0');
        $('.content-container').css('margin-left', '0');
        $('.menuFoldIcon').css('visibility', 'hidden');
        $('.menuUnFoldIcon').css('visibility', 'visible');
    }
    onMenuUnFold() {
        $('#home-container aside').css('visibility', 'visible');
        $('#home-container section').css('margin-left', '240px');
        $('#home-container > .breadcrumb').css('margin-left', '240px');
        $('.content-container').css('margin-left', '240px');
        $('.menuFoldIcon').css('visibility', 'visible');
        $('.menuUnFoldIcon').css('visibility', 'hidden');
    }
    logout() {
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
          } else if (this.state.currentPage == "taglists" || this.state.currentPage == "taglist") {
            this.state.defaultOpenKeys.push("ob-tab-manage");
          }
        return (
            <div id="home-container">
                <aside>
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
                        <SubMenu key="job-tab-manage"
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
                <section>
                    <div className="menu-display">
                        <Icon className="menuFoldIcon" type="menu-fold" style={{cursor:'pointer'}} onClick={this.onMenuFold}/>
                        <Icon className="menuUnFoldIcon" type="menu-unfold" style={{visibility: 'hidden', cursor:'pointer'}} onClick={this.onMenuUnFold}/>
                        <div className="logout">
                            <span>当前用户: {localStorage.userId}</span>
                            <Button type="primary" size="small" className="logout-btn" onClick={this.logout}><Icon type="logout"/>退出系统</Button>
                        </div>
                    </div>
                </section>
                <div className="breadcrumb">
                    <Breadcrumb>
                        {breadcrumbItem}
                    </Breadcrumb>
                </div>
            </div>
        )
    }
}

export default Home;