import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/channelList.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;

class ChannelList extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/channelfroms?' + postParams,'post', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
                message.success('新增渠道成功');
            } else if (1 != result) {
                message.error('新增渠道失败');
            }
        });
    };

    componentWillMount(){
        
    };
 
    callback() {

    }   
    render() {
        return (
            <div id="channelList-container">
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="基本信息" key="1">基本信息</TabPane>
                    <TabPane tab="任务信息" key="2">任务信息</TabPane>
                    <TabPane tab="任务核销" key="3">任务核销</TabPane>
                    <TabPane tab="财务明细" key="4">财务明细</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default ChannelList;