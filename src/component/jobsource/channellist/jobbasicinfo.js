import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import './css/channelList.css';
import { Tabs } from 'antd';

class JobBasicInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount(){
    };
 
    callback() {

    }   
    render() {
        return (
            <div id="jobbasicinfo-container">
                {this.props.init[0]?
                <ul className="userinfo-detail-ul">
                    <li className="userinfo-detail-li">任务来源类型ID:&nbsp;<span>{this.props.init[0].id}</span></li>
                    <li className="userinfo-detail-li">任务来源渠道名称:&nbsp;<span>{this.props.init[0].name}</span></li>
                    <li className="userinfo-detail-li">创建时间:&nbsp;<span>{this.props.init[0].createTime}</span></li>
                    <li className="userinfo-detail-li">状态:&nbsp;<span>使用中</span></li>
                    <li className="userinfo-detail-li">剩余金额:&nbsp;<span>{this.props.init[0].balance}</span></li>
                </ul>
               :""
               }
               
            </div>
        )
    }
}
export default JobBasicInfo;