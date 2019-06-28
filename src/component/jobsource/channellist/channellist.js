import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import './css/channelList.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import JobBasicInfo from './jobbasicinfo';
import JobManage from './jobmanage';
import WorkOrder from './workorder';

class ChannelList extends Component {
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
                    <TabPane tab="基本信息" key="1"><JobBasicInfo  {...this.props} init={this.state.data}/></TabPane>
                    <TabPane tab="任务管理" key="2"><JobManage {...this.props} /></TabPane>
                    <TabPane tab="工单核销" key="3"><WorkOrder {...this.props}/></TabPane>
                    <TabPane tab="财务明细" key="4">财务明细</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default ChannelList;