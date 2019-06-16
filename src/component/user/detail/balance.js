import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/balance.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;
import DrawRecord from './record/drawrecord';
import IncomeRecord from './record/incomerecord';

class Balance extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/userinfo','post',params,(result)=>{
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
        // this.fetch();
    };

    callback() {

    }
    copy() {
        copy(this.state.data.url);
    }
    render() {
        return (
            <div id="balance-container">
               <div className="total">
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
               </div>
               <div className="">
               <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="提现记录" key="1"><DrawRecord/></TabPane>
                    <TabPane tab="收入记录" key="2"><IncomeRecord/></TabPane>
                </Tabs>
               </div>
            </div>
        )
    }
}

export default Balance;