import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth'
import './css/homex.css';
import { Menu, Icon, Button, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import {breadcrumbconfig} from './breadcrumbconfigx';
import $ from "jquery";

class Homex extends Component {
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
      if (!localStorage.token) {
        this.props.history.push(auth.getLoginUrl());
      }
    };

    onMenuFold = () => {
        $('#home-container aside').css('display', 'none');
        $('#home-container section').css('margin-left', '0');
        $('#home-container > .breadcrumb').css('margin-left', '0');
        $('.content-container').css('margin-left', '0');
        $('.menuFoldIcon').css('display', 'none');
        $('.menuUnFoldIcon').css('display', 'block');
    }
    onMenuUnFold = () => {
        $('#home-container aside').css('display', 'block');
        $('#home-container section').css('margin-left', '240px');
        $('#home-container > .breadcrumb').css('margin-left', '240px');
        $('.content-container').css('margin-left', '240px');
        $('.menuFoldIcon').css('display', 'block');
        $('.menuUnFoldIcon').css('display', 'none');
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
            <div id="homex-container">
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
                <section>
                    <div className="menu-display">
                        <Icon className="menuFoldIcon" type="menu-fold" onClick={this.onMenuFold}/>
                        <Icon className="menuUnFoldIcon" type="menu-unfold" style={{display: 'none'}} onClick={this.onMenuUnFold}/>
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

export default Homex;