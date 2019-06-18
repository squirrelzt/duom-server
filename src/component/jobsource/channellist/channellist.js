import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/channelList.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import JobBasicInfo from './jobbasicinfo';

class ChannelList extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            jobData: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/taskForm?idList=' + params,'get', {} ,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    fetchAllJob(params) {
        auth.fetch('/v1/taskFormType','get', {} ,(result)=>{
            console.log("------------------");
            console.log(result);
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
                    <TabPane tab="任务信息" key="2">任务信息</TabPane>
                    <TabPane tab="任务核销" key="3">任务核销</TabPane>
                    <TabPane tab="财务明细" key="4">财务明细</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default ChannelList;