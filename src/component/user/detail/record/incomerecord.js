import React, { Component } from 'react';
import auth from './../../../../common/auth';
import './css/drawrecord.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

let columns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '收入金额',
    dataIndex: 'incomeAmount'
  },{
    title: '收入类型',
    dataIndex: 'incomeType'
  },{
    title: '任务名称',
    dataIndex: 'jobName'
  },{
    title: '队员ID',
    dataIndex: 'teamMemberId'
  },{
    title: '状态',
    dataIndex: 'state'
  },{
    title: '时间',
    dataIndex: 'time'
  }];

class IncomeRecord extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/listIncomeRecords','post',params,(result)=>{
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
      if (localStorage.token == null) {
        this.props.history.push('/login');
      }
        this.fetch();
    };

    render() {
        return (
            <div id="incomerecord-container">
               <Table columns={columns}
                        rowKey={data => data.id} 
                        dataSource={this.state.data}
                        />
            </div>
        )
    }
}

export default IncomeRecord;