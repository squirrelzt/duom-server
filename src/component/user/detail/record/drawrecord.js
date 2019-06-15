import React, { Component } from 'react';
import auth from './../../../../common/auth';
import './css/drawrecord.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

let columns = [{
    title: '提现ID',
    dataIndex: 'drawId'
  },{
    title: '提现金额',
    dataIndex: 'drawAmount'
  },{
    title: '提现后金额',
    dataIndex: 'balance'
  },{
    title: '支付宝账号',
    dataIndex: 'alipayCode'
  },{
    title: '真实姓名',
    dataIndex: 'name'
  },{
    title: '状态',
    dataIndex: 'state'
  },{
    title: '时间',
    dataIndex: 'time'
  }];

class DrawRecord extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/listDrawRecords','post',params,(result)=>{
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        this.fetch();
    };

    callback() {

    }
    copy() {
        copy(this.state.data.url);
    }
    render() {
        return (
            <div id="drawrecord-container">
               <Table columns={columns}
                        rowKey={data => data.drawId} 
                        dataSource={this.state.data}
                        />
            </div>
        )
    }
}

export default DrawRecord;