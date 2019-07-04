import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth'
import './css/homex.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import {breadcrumbconfig} from './breadcrumbconfigx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JobSourcex from '../jobsourcex/jobsourcex.js';
import ChannelListx from './../jobsourcex/channellistx/channellistx.js';
import './../../entry/css/index.css';

class Homex extends Component {
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
        window.location.href=auth.getLoginUrlx();
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
         
          if (urlArray.length == 2) {
              if (urlArray[1] == "homelistx") {
                this.state.currentPage = "homelistx";
              } 
              this.state.defaultOpenKeys.push("homes-job-resource-manage");
          } else if (urlArray.length > 2) {
            if (urlArray[1] == "homelist" && urlArray[2] == "basicinfox") {
                this.state.currentPage = "homelistx";
              } 
              this.state.defaultOpenKeys.push("homes-job-resource-manage");
          }
        return (
            <div>
            <div id="homex-container" style={{visibility: this.state.asideVisibility}}>
                <aside>
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          selectedKeys={[this.state.currentPage]}
                          defaultOpenKeys={this.state.defaultOpenKeys}>
                        <SubMenu key="homes-job-resource-manage"
                                title={
                                    <span>
                                        <Icon type="apartment"></Icon>
                                        <span>任务来源渠道管理</span>
                                    </span>
                                }>
                            <Menu.Item key="homelistx"><Link to="/home/homelistx">渠道列表</Link></Menu.Item>
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
                <Route path='/home/homelistx' component = { JobSourcex }/>
                <Route path='/home/homelist/basicinfox/:id' component = { ChannelListx }/>
            </div>
            </div>
        )
    }
}

export default Homex;