import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/detail.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

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
        // this.fetch();
    };

    callback() {

    }
    render() {
        return (
            <div id="user-container">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="用户信息" key="1">用户信息</TabPane>
                    <TabPane tab="余额信息" key="2">余额信息</TabPane>
                    <TabPane tab="团队信息" key="3">团队信息</TabPane>
                    <TabPane tab="任务信息" key="4">任务信息</TabPane>
                </Tabs>
               
            </div>
        )
    }
}

export default Detail;