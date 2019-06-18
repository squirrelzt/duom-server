import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../common/auth';
import './css/userinfo.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;
import copy from 'copy-to-clipboard';

class UserInfo extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }
    fetch(params) {
        auth.fetch('/v1/users/' + params + '/c','get',{},(result)=>{
            this.setState({
                data: result.user
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
    };

    callback() {

    }
    copy() {
        copy(this.state.data.url);
    }
    render() {
        return (
            <div id="userinfo-container">
                {this.props.init == null ?<div></div>
               :<ul className="userinfo-detail-ul">
               <li className="userinfo-detail-li">用户ID:&nbsp;<span>{this.props.init.id}</span></li>
               <li className="userinfo-detail-li">用户名:&nbsp;<span>{this.props.init.username}</span></li>
               <li className="userinfo-detail-li">余额:&nbsp;<span>{this.props.init.balance}</span></li>
               <li className="userinfo-detail-li">手机号:&nbsp;<span>{this.props.init.phone}</span></li>
               <li className="userinfo-detail-li">创建时间:&nbsp;<span>{this.props.init.createTime}</span></li>
               <li className="userinfo-detail-li">来源渠道:&nbsp;<span>{this.props.init.channelFromId}</span></li>
               <li className="userinfo-detail-li">来源渠道:&nbsp;<span>{this.props.init.channelToId}</span></li>
               <li className="userinfo-detail-li">备注:&nbsp;<span>{this.props.init.remark}</span></li>
               </ul>
               }
               
            </div>
        )
    }
}

export default UserInfo;