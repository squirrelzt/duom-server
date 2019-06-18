import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/team.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;

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
            data: []
        };
    }

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
    };

    callback() {

    }
   
    render() {
        return (
            <div id="team-container">
               <div className="total">
                    <div className="total-section">
                        <div>团队总数</div>
                        <div>150</div>
                    </div>
                    <div className="total-section">
                        <div>一级团队人数</div>
                        <div>50</div>
                    </div>
                    <div className="total-section">
                        <div>二级团队人数</div>
                        <div>100</div>
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