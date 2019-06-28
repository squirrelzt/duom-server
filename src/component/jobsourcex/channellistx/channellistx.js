import React, { Component } from 'react';
import {auth} from '../../../common/auth';
import './css/channelListx.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import JobBasicInfox from './jobbasicinfox';
import JobManagex from './jobmanagex';
import WorkOrderx from './workorderx';

class ChannelListx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            jobData: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/channelfroms/' + params + '?bUserId=' + localStorage.userId,'get', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        this.fetch(this.props.match.params.id);
    };
 
    callback() {

    }   
    render() {
        return (
            <div id="channelList-container">
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="基本信息" key="1"><JobBasicInfox  {...this.props} init={this.state.data}/></TabPane>
                    <TabPane tab="任务管理" key="2"><JobManagex {...this.props} /></TabPane>
                    <TabPane tab="工单核销" key="3"><WorkOrderx {...this.props}/></TabPane>
                    <TabPane tab="财务明细" key="4">财务明细</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default ChannelListx;