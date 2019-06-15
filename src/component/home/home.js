import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/home.css';
import { Menu, Icon, Breadcrumb, Table, Divider } from 'antd';
const { SubMenu }  = Menu;

let columns = [{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '用户名',
    dataIndex: 'userName'
  },{
    title: '上级用户ID',
    dataIndex: 'leaderId'
  },{
    title: '渠道',
    dataIndex: 'channel'
  },{
    title: '状态',
    dataIndex: 'state'
  },{
    title: '注册时间',
    dataIndex: 'registerTime'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <a href="">冻结</a>
                    <Divider type="vertical" />
                    <a href="">查看详情</a>
                </span>;
    }
  }];

class Home extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/listUsers','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        // this.fetch();
    };

    fileList(item) {
        if (item.directory) {
            return (
                <div>
                    <div className="dir-img dir-img" />
                    <div className="monitor-file">{item.filename}</div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="dir-img txt-img" />
                    <div className="monitor-file">{item.filename}</div>
                </div>
            )
        }
    };
    onMenuFold() {
        // console.log("------------------");

    }
    render() {
        console.log("======================");
        const context = this.props.children;
        return (
            <div id="home-container">
                <aside>
                    <div className="aside-space"></div>
                    <Menu mode="inline"
                          defaultSelectedKeys = {['user-list']}
                          defaultOpenKeys={['user-manage-menu']}>
                        <SubMenu key="user-manage-menu"
                                title={
                                    <span>
                                        <Icon type="team"></Icon>
                                        <span>用户管理</span>
                                    </span>
                                }>
                            <Menu.Item key="user-list">用户列表</Menu.Item>
                            <Menu.Item key="user-detail">用户详情</Menu.Item>
                        </SubMenu>
                        <SubMenu key="job-resource-manage"
                                title={
                                    <span>
                                        <Icon type="edit"></Icon>
                                        <span>任务来源渠道管理</span>
                                    </span>
                                }>
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
                                        <Icon type="setting"></Icon>
                                        <span>用户推广渠道佣金列表</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="extension-commison-record"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>用户推广渠道佣金发放记录</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="finance-setting"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>财务设置</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="commission-withdraw-list"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>佣金提现列表</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="job-order-manage"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>任务工单管理</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="job-tab-manage"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
                                        <span>任务标签管理</span>
                                    </span>
                                }>
                        </SubMenu>
                        <SubMenu key="finance-statis"
                                title={
                                    <span>
                                        <Icon type="setting"></Icon>
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
                        <Icon type="menu-fold" onClick={this.onMenuFold}/>
                    </div>
                    <div className="container">
                        <div className="content">
                            <div className="breadcrumb">
                                <Breadcrumb>
                                    <Breadcrumb.Item key="user-manage">用户管理</Breadcrumb.Item>
                                    <Breadcrumb.Item key="user-list">用户列表</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="user-list-table">
                                {context}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home;