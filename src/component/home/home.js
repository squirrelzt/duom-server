import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';
import { Menu, Icon, Divider, Breadcrumb } from 'antd';
const { SubMenu }  = Menu;
import breadcrumbconfig from './breadcrumbconfig';
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
    //      // test
    //   localStorage.token = "qweraetstetxdgsyewrywryewry";
    //   localStorage.userId = "123";
    //   // test
      if (localStorage.token == null) {
        this.props.history.push('/login');
      }
    };

    onMenuFold() {
        $('#home-container aside').css('display', 'none');
        $('#home-container section').css('margin-left', '0');
        $('#home-container > .breadcrumb').css('margin-left', '0');
        $('.content-container').css('margin-left', '0');
        $('.menuFoldIcon').css('display', 'none');
        $('.menuUnFoldIcon').css('display', 'block');
    }
    onMenuUnFold() {
        $('#home-container aside').css('display', 'block');
        $('#home-container section').css('margin-left', '240px');
        $('#home-container > .breadcrumb').css('margin-left', '240px');
        $('.content-container').css('margin-left', '240px');
        $('.menuFoldIcon').css('display', 'block');
        $('.menuUnFoldIcon').css('display', 'none');
    }
    render() {
        // console.log("+++++++++++++++++++");
        // console.log(this.props.location.pathname);
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
        console.log('urlArray=' + urlArray);
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
          if (this.state.currentPage == "list" || this.state.currentPage == "detail") {
            this.state.defaultOpenKeys.push("user-manage-menu");
          } else if (this.state.currentPage == "channel") {
            this.state.defaultOpenKeys.push("job-resource-manage");
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
                            <Menu.Item key="list"><Link to="/user/list">用户列表</Link></Menu.Item>
                            <Menu.Item key="detail"><Link to="/user/detail">用户详情</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="job-resource-manage"
                                title={
                                    <span>
                                        <Icon type="apartment"></Icon>
                                        <span>任务来源渠道管理</span>
                                    </span>
                                }>
                            <Menu.Item key="channel"><Link to="/job/channel">渠道管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="channel-manage"
                                title={
                                    <span>
                                        <Icon type="table"></Icon>
                                        <span>用户推广渠道管理</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="channel-commission-list"
                                title={
                                    <span>
                                        <Icon type="shopping-cart"></Icon>
                                        <span>用户推广渠道佣金列表</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="extension-commison-record"
                                title={
                                    <span>
                                        <Icon type="profile"></Icon>
                                        <span>用户推广渠道佣金发放记录</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="finance-setting"
                                title={
                                    <span>
                                        <Icon type="pay-circle"></Icon>
                                        <span>财务设置</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="commission-withdraw-list"
                                title={
                                    <span>
                                        <Icon type="export"></Icon>
                                        <span>佣金提现列表</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="job-order-manage"
                                title={
                                    <span>
                                        <Icon type="appstore"></Icon>
                                        <span>任务工单管理</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="job-tab-manage"
                                title={
                                    <span>
                                        <Icon type="projecthttps://www.baidu.com/?tn=39042058_41_oem_dg"></Icon>
                                        <span>任务标签管理</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="finance-statis"
                                title={
                                    <span>
                                        <Icon type="account-book"></Icon>
                                        <span>财务统计</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="setting-manage"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>系统管理</span>
                                    </span>
                                }>
                        </SubMenu>
                    </Menu>
                </aside>
                <section>
                    <div className="menu-display">
                        <Icon className="menuFoldIcon" type="menu-fold" onClick={this.onMenuFold}/>
                        <Icon className="menuUnFoldIcon" type="menu-unfold" style={{display: 'none'}} onClick={this.onMenuUnFold}/>
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