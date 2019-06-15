import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/userinfo.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;
import copy from 'copy-to-clipboard';

class UserInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/userinfo','post',params,(result)=>{
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
    copy() {
        copy(this.state.data.url);
    }
    render() {
        return (
            <div id="userinfo-container">
               <ul className="userinfo-detail-ul"></ul>
                <li className="userinfo-detail-li">用户ID:<span>{this.state.data.userId}</span></li>
                <li className="userinfo-detail-li">用户名:<span>{this.state.data.userName}</span></li>
                <li className="userinfo-detail-li">注册时间:<span>{this.state.data.registerTime}</span></li>
                <li className="userinfo-detail-li">来源渠道:<span>{this.state.data.channel}</span></li>
                <li className="userinfo-detail-li">推广链接:<span>{this.state.data.url}</span>
                    <button className="copy" onClick={this.copy.bind(this)}>复制</button>
                </li>
                <li className="userinfo-detail-li">备注:<span>{this.state.data.remark}</span></li>
            </div>
        )
    }
}

export default UserInfo;