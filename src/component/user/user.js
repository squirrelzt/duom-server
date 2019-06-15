import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/user.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

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

class User extends Component {
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
        this.fetch();
    };
    callback() {

    }
    render() {
        return (
            <div id="user-container">
                <div className="user-list-table">
                    <Table columns={columns}
                        rowKey={data => data.userId} 
                        dataSource={this.state.data}
                        />
                </div>
            </div>
        )
    }
}

export default User;