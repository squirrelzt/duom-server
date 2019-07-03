import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import './css/userinfo.css';

class UserInfo extends Component {
    constructor(props) {
        super();
        this.state = {
        };
    }
    fetch(params) {
        auth.fetch('/v1/users/' + params + '/c','get',{},(result)=>{
            if ("error" != result) {
                this.setState({
                    data: result.user
                });
            }
        });
    };

    componentWillMount(){
        if (!localStorage.token) {
            this.props.history.push(auth.getLoginUrl());
          }
    };

    callback = () => {

    }
    render() {
        return (
            <div id="userinfo-container">
                {this.props.init?
                <ul className="userinfo-detail-ul">
                        <li className="userinfo-detail-li">用户ID:&nbsp;<span>{this.props.init.id}</span></li>
                        <li className="userinfo-detail-li">用户名:&nbsp;<span>{this.props.init.username}</span></li>
                        <li className="userinfo-detail-li">手机号:&nbsp;<span>{this.props.init.phone}</span></li>
                        <li className="userinfo-detail-li">推广渠道:&nbsp;<span>{this.props.init.channelToName}</span></li>
                        <li className="userinfo-detail-li">创建时间:&nbsp;<span>{this.props.init.createTime}</span></li>
                </ul>
                :""
                }
            </div>
        )
    }
}

export default UserInfo;