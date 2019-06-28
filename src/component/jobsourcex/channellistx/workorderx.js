import React, { Component } from 'react';
import {auth} from '../../../common/auth';
import './css/channelListx.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import Auditedx from './workorderx/auditedx';
import UnAuditedx from './workorderx/unauditedx';
import Rejectx from './workorderx/rejectx';

class WorkOrderx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            auditedData: []
        };
    }

    componentWillMount(){
       
    };
 
    callback() {

    }   
    render() {
        return (
            <div id="workorderx-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="未审核" key="1"><UnAuditedx  {...this.props}/></TabPane>
                    <TabPane tab="已审核" key="2"><Auditedx {...this.props} /></TabPane>
                    <TabPane tab="驳回" key="3"><Rejectx {...this.props} /></TabPane>
                </Tabs>
            </div>
        )
    }
}
export default WorkOrderx;