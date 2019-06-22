import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/extenddetail.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import ChannelInfo from './detail/channelinfo';
import SubUser from './detail/subuser';
import CommissionDetail from './detail/commissiondetail';

class ExtendDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            withdrawData: [],
            incomeData: [],
            team1Data: [],
            team2Data: [],
            jobData: []
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
    };

    callback() {

    }
    render() {
        // console.log(this.props.match);
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="渠道信息" key="1"><ChannelInfo {...this.props} /></TabPane>
                    <TabPane tab="下属用户" key="2"><SubUser {...this.props} init={{channleFromId: this.props.match.params.id}} /></TabPane>
                    <TabPane tab="佣金明细" key="3"><CommissionDetail {...this.props} init={{channleToId:this.props.match.params.id}}/></TabPane>
                    <TabPane tab="佣金发放" key="4">佣金发放</TabPane>
                    {/* <TabPane tab="任务信息" key="4"><JobInfo {...this.props}/></TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default ExtendDetail;