import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/detail.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
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
    fetch(params = {}) {
        auth.fetch('/user/listUsers','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
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
    render() {
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="用户信息" key="1"><UserInfo/></TabPane>
                    <TabPane tab="余额信息" key="2"><Balance/></TabPane>
                    <TabPane tab="团队信息" key="3"><Team/></TabPane>
                    <TabPane tab="任务信息" key="4"><JobInfo/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Detail;