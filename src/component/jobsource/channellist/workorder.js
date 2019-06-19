import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/channelList.css';
import { Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import Audited from './workorder/audited';
import UnAudited from './workorder/unaudited';

class WorkOrder extends Component {
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
            <div id="workorder-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="未审核" key="1"><UnAudited  {...this.props}/></TabPane>
                    <TabPane tab="已审核" key="2"><Audited {...this.props} /></TabPane>
                </Tabs>
            </div>
        )
    }
}
export default WorkOrder;