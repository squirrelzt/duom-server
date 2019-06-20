import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/channelList.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;

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
                {this.props.init[0] == null ?<div></div>
               :<ul className="userinfo-detail-ul">
                    {/* <li className="userinfo-detail-li">用户ID:&nbsp;<span>{this.props.init[0].id}</span></li> */}
                    <li className="userinfo-detail-li">任务来源类型ID:&nbsp;<span>{this.props.init[0].id}</span></li>
                    <li className="userinfo-detail-li">任务来源渠道名称:&nbsp;<span>{this.props.init[0].name}</span></li>
                    {/* <li className="userinfo-detail-li">buserID:&nbsp;<span>{this.props.init[0].buserId}</span></li> */}
                    {/* <li className="userinfo-detail-li">图片地址:&nbsp;<span>{this.props.init[0].urlImg}</span></li> */}
                    {/* <li className="userinfo-detail-li">来源渠道:&nbsp;<span>{this.props.init[0].channelFromId}</span></li> */}
                    <li className="userinfo-detail-li">创建时间:&nbsp;<span>{this.props.init[0].createTime}</span></li>
                    <li className="userinfo-detail-li">状态:&nbsp;<span>使用中</span></li>
                    <li className="userinfo-detail-li">剩余金额:&nbsp;<span>{this.props.init[0].balance}</span></li>
                    {/* <li className="userinfo-detail-li">更新时间:&nbsp;<span>{this.props.init[0].updateTime}</span></li> */}
               </ul>
               }
               
            </div>
        )
    }
}
export default JobBasicInfo;