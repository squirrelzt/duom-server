import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../common/auth';
import './css/channelinfo.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
import copy from 'copy-to-clipboard';

class ChannelInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <div id="channelinfo-container">
                {this.props.init == null ?<div></div>
               :<ul className="channelinfo-detail-ul">
                    <li className="channelinfo-detail-li">推广渠道ID:&nbsp;<span>{this.props.init.id}</span></li>
                    <li className="channelinfo-detail-li">推广渠道名:&nbsp;<span>{this.props.init.name}</span></li>
                    <li className="channelinfo-detail-li">收入:&nbsp;<span>{this.props.init.income}</span></li>
                    <li className="channelinfo-detail-li">余额:&nbsp;<span>{this.props.init.balance}</span></li>
                    <li className="channelinfo-detail-li">状态:&nbsp;<span>{this.props.init.status}</span></li>
                    <li className="channelinfo-detail-li">来源渠道:&nbsp;<span>{this.props.init.remark}</span></li>
                    <li className="channelinfo-detail-li">来源渠道:&nbsp;<span>{this.props.init.createTime}</span></li>
                    <li className="channelinfo-detail-li">备注:&nbsp;<span>{this.props.init.updateTime}</span></li>
                    </ul>
               }
               
            </div>
        )
    }
}

export default ChannelInfo;