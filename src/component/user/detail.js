import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/detail.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import UserInfo from './detail/userinfo';
import Balance from './detail/balance';
import Team from './detail/team';
import JobInfo from './detail/jobinfo';

class Detail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            withdrawData: [],
            incomeData: [],
            team1Data: [],
            team2Data: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/users/' + params + '/c','get',{},(result)=>{
            this.setState({
                data: result.user,
                team1Data: result.userLowers,
                team2Data: result.userLower2s
            })
        });
    };

    fetchWithdraw(params) {
        auth.fetch('/v1/cashout/users/' + params,'get',{},(result)=>{
            this.setState({
                withdrawData: result
            })
        });
    };

    fetchIncome(params) {
        auth.fetch('/v1/income/users/' + params,'get',{},(result)=>{
            this.setState({
                incomeData: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
        }
        this.fetch(this.props.match.params.id);
        this.fetchWithdraw(this.props.match.params.id);
        this.fetchIncome(this.props.match.params.id);
    };

    callback() {

    }
    render() {
        // console.log(this.props.match);
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="用户信息" key="1"><UserInfo {...this.props} init={this.state.data}/></TabPane>
                    <TabPane tab="余额信息" key="2"><Balance {...this.props} init = {{withdrawData: this.state.withdrawData,incomeData:this.state.incomeData}}/></TabPane>
                    <TabPane tab="团队信息" key="3"><Team {...this.props} init = {{team1Data:this.state.team1Data,team2Data:this.state.team2Data}}/></TabPane>
                    <TabPane tab="任务信息" key="4"><JobInfo {...this.props} init = {this.state.data}/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Detail;