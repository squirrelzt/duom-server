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
    title: '金额变动',
    dataIndex: 'accountChanged'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '更新时间',
    dataIndex: 'updateTime'
  }];

  let incomeColumns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '金额',
    dataIndex: 'balance'
  },{
    title: '账户变动',
    dataIndex: 'accountChanged'
  },{
    title: '任务ID',
    dataIndex: 'taskId'
  },{
    title: '任务名称',
    dataIndex: 'taskName'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '下级用户ID',
    dataIndex: 'slaveUserId'
 },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '更新时间',
    dataIndex: 'updateTime'
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
            this.props.history.push('/login');
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