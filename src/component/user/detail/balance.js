import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/balance.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

let withdrawColumns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '用户名',
    dataIndex: 'name'
  },{
    title: '支付宝账号',
    dataIndex: 'alipayAccount'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '提现金额',
    dataIndex: 'accountChanged'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '时间',
    dataIndex: 'createTime'
  }];

  let incomeColumns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '收入金额',
    dataIndex: 'accountChanged'
  },{
    title: '任务名称',
    dataIndex: 'taskName'
  },{
    title: '队员ID',
    dataIndex: 'userId'
  },{
    title: '状态',
    dataIndex: 'status',
    render(text) {
      return <span>已通过</span>
    }
  },{
    title: '时间',
    dataIndex: 'createTime'
  }];

class Balance extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push(auth.getLoginUrl());
          }
    };

    callback() {

    }
    render() {
        return (
            <div id="balance-container">
               {/* <div className="total">
                    <div className="total-section">
                        <div>当前余额</div>
                        <div>100</div>
                    </div>
                    <div className="total-section">
                        <div>已提现金额</div>
                        <div>8120</div>
                    </div>
                    <div className="total-section">
                        <div>本月新增</div>
                        <div>23000</div>
                    </div>
               </div> */}
               <div className="">
               <Tabs defaultActiveKey="withdrawRecord" onChange={this.callback}>
                    <TabPane tab="提现记录" key="withdrawRecord">
                        <Table columns={withdrawColumns}
                            rowKey={data => data.id} 
                            dataSource={this.props.init.withdrawData}
                        />
                    </TabPane>
                    <TabPane tab="收入记录" key="incomeRecord">
                        <Table columns={incomeColumns}
                            rowKey={data => data.id} 
                            dataSource={this.props.init.incomeData}
                        />
                    </TabPane>
                </Tabs>
               </div>
            </div>
        )
    }
}

export default Balance;