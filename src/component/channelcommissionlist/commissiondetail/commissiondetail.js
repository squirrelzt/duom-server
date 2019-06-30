import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import './css/commissiondetail.css';
import { Table, Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;


let columns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '当前余额',
    dataIndex: 'balance'
  },{
    title: '已发放金额',
    dataIndex: 'accountChanged'
  },{
    title: '发放时间',
    dataIndex: 'createTime'
  },{
    title: '发放时间',
    dataIndex: 'updateTime'
  }];

class CommissionDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            balance: 0,
            accountChanged: 0,
            total: 0
        };
    }
    fetch(params) {
        auth.fetch('/v1/channelTo/' + params + '/cashout','get', {} ,(result)=>{
            if ("error" != result) {
                this.setState({
                    data: result,
                    balance: result[0].balance,
                    accountChanged: result[0].accountChanged,
                    total: (parseInt(result[0].balance)+parseInt(result[0].accountChanged))
                });
            }
        });
    };

    componentWillMount(){
        this.fetch(this.props.match.params.id);
    };
 
    render() {
        return (
            <div id="commissiondetail-container">
                <div className="total">
                    <div className="total-section">
                        <div>当前余额</div>
                        <div>{this.state.balance}</div>
                    </div>
                    <div className="total-section">
                        <div>已发放金额</div>
                        <div>{this.state.accountChanged}</div>
                    </div>
                    <div className="total-section">
                        <div>总收入</div>
                        <div>{this.state.total}</div>
                    </div>
               </div>
               <div className="grant-record">
                    <Table columns={columns}
                        rowKey={data => data.id} 
                        dataSource={this.state.data}
                    />
               </div>
            </div>
        )
    }
}
export default CommissionDetail;