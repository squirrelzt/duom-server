import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/user.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

let columns = [{
    title: '用户ID',
    dataIndex: 'id'
  },{
    title: '用户名',
    dataIndex: 'username'
  },{
    title: '上级用户ID',
    dataIndex: 'userIdUpper'
  },{
    title: '任务推广渠道',
    dataIndex: 'channelToId'    
  },{
    title: '状态',
    dataIndex: 'status',
    render(text) {
      switch (text) {
          case 0:
            return <span>启用</span>;
            break;
          case 1:
            return <span>禁用</span>;
            break;
        }
    }
  },{
    title: '手机号',
    dataIndex: 'phone'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <Link to={"/user/list/detail/" + record.id}>查看详情</Link>
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
      auth.fetch('/v1/users/c','get',params,(result)=>{
          if ("1" != result) {
            this.setState({
              data: result
            });
          }
      });
    };

    componentWillMount() {
      // // test
      // localStorage.token = "qweraetstetxdgsyewrywryewry";
      // localStorage.userId = "123";
      // // test
      if (localStorage.token == null) {
        this.props.history.push(auth.getLoginUrl());
      }
      this.fetch();
    };
    callback() {

    }
    render() {
        return (
            <div id="user-container">
                <div className="user-list-table">
                    <Table columns={columns}
                        rowKey={data => data.id} 
                        dataSource={this.state.data}
                        />
                </div>
            </div>
        )
    }
}

export default User;