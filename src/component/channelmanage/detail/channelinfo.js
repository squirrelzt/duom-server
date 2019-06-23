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

    fetch(params) {
        auth.fetch('/v1/channelTo','get', {} ,(result)=>{
            if (400 != result && "1" != result) {
            //   console.log('-----------------------');
            //   console.log(result);
              this.setState({
                data: result[0]
              });
            //   console.log(this.state.data);
            }
            
        });
      };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push(auth.getLoginUrl());
        }
        this.fetch(this.props.match.params.id);
    };

    render() {
        return (
            <div id="channelinfo-container">
                {this.state.data == null ?<div></div>
               :<ul className="channelinfo-detail-ul">
                    <li className="channelinfo-detail-li">推广渠道ID:&nbsp;<span>{this.state.data.id}</span></li>
                    <li className="channelinfo-detail-li">推广渠道名:&nbsp;<span>{this.state.data.name}</span></li>
                    <li className="channelinfo-detail-li">收入:&nbsp;<span>{this.state.data.income}</span></li>
                    <li className="channelinfo-detail-li">余额:&nbsp;<span>{this.state.data.balance}</span></li>
                    <li className="channelinfo-detail-li">状态:&nbsp;<span>{this.state.data.status}</span></li>
                    <li className="channelinfo-detail-li">来源渠道:&nbsp;<span>{this.state.data.remark}</span></li>
                    <li className="channelinfo-detail-li">创建时间:&nbsp;<span>{this.state.data.createTime}</span></li>
                    <li className="channelinfo-detail-li">更新时间:&nbsp;<span>{this.state.data.updateTime}</span></li>
                    </ul>
               }
               
            </div>
        )
    }
}

export default ChannelInfo;