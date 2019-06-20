import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/extenddetail.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import ChannelInfo from './detail/channelinfo';
// import UserInfo from './detail/userinfo';
// import Balance from './detail/balance';
// import Team from './detail/team';
// import JobInfo from './detail/jobinfo';

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

    fetch(params) {
        auth.fetch('/v1/channelTo','get', {} ,(result)=>{
          console.log('-------------------------------------');
          console.log(result);
            if (400 != result && "1" != result) {
              this.setState({
                data: result
              });
            }
            
        });
      };
    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
        }
        this.fetch(this.props.match.params.id);
        // this.fetchWithdraw(this.props.match.params.id);
        // this.fetchIncome(this.props.match.params.id);
        // this.fetchJob(this.props.match.params.id);
    };

    callback() {

    }
    render() {
        // console.log(this.props.match);
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="渠道信息" key="1"><ChannelInfo {...this.props} init={this.state.data[0]}/></TabPane>
                    <TabPane tab="下属用户" key="2">下属用户/></TabPane>
                    <TabPane tab="佣金明细" key="3">佣金明细</TabPane>
                    <TabPane tab="佣金发放" key="4">佣金发放</TabPane>
                    {/* <TabPane tab="任务信息" key="4"><JobInfo {...this.props}/></TabPane> */}
                </Tabs>
            </div>
        )
    }
}

export default ExtendDetail;