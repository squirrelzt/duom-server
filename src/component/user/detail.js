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
            data: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/users/' + params + '/c','get',{},(result)=>{
            this.setState({
                data: result.user
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
        }
        this.fetch(this.props.match.params.id);
    };

    callback() {

    }
    render() {
        // console.log(this.props.match);
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="用户信息" key="1"><UserInfo {...this.props} init={this.state.data}/></TabPane>
                    <TabPane tab="余额信息" key="2"><Balance {...this.props} init = {this.state.data}/></TabPane>
                    <TabPane tab="团队信息" key="3"><Team {...this.props} init = {this.state.data}/></TabPane>
                    <TabPane tab="任务信息" key="4"><JobInfo {...this.props} init = {this.state.data}/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Detail;