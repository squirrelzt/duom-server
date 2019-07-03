import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import './css/team.css';
import { Table } from 'antd';

let columns = [{
    title: '团队ID',
    dataIndex: 'id'
  },{
    title: '用户ID',
    dataIndex: 'roleId'
  },{
    title: '用户名',
    dataIndex: 'username'
  }];

class Team extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            team1Count: 0,
            team2Count: 0,
            teamTotalCount: 0
        };
    }

    componentWillMount(){
        if (!localStorage.token) {
            this.props.history.push(auth.getLoginUrl());
        }
        this.setState({
            team1Count:this.props.init.team1Data.length,
            team2Count:this.props.init.team2Data.length,
            teamTotalCount: (this.props.init.team1Data.length + this.props.init.team2Data.length)
        });
    };

    callback = () => {

    }
   
    render() {
        return (
            <div id="team-container">
               <div className="total">
                    <div className="total-section">
                        <div>团队总数</div>
                        <div>{this.state.team1Count}</div>
                    </div>
                    <div className="total-section">
                        <div>一级团队人数</div>
                        <div>{this.state.team2Count}</div>
                    </div>
                    <div className="total-section">
                        <div>二级团队人数</div>
                        <div>{this.state.teamTotalCount}</div>
                    </div>
               </div>
               <div className="">
               <Tabs defaultActiveKey="team1" onChange={this.callback}>
                    <TabPane tab="一级团队" key="team1">
                        <Table columns={columns}
                            rowKey={data => data.id} 
                            dataSource={this.props.init.team1Data}
                        />
                    </TabPane>
                    <TabPane tab="二级团队" key="team2">
                        <Table columns={columns}
                            rowKey={data => data.id} 
                            dataSource={this.props.init.team2Data}
                        />
                    </TabPane>
                </Tabs>
               </div>
            </div>
        )
    }
}

export default Team;