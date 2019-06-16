import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/team.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
const { TabPane } = Tabs;
import Team1 from './team/team1';
import Team2 from './team/team2';

class Team extends Component {
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
               <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="一级团队" key="1"><Team1/></TabPane>
                    <TabPane tab="二级团队" key="2"><Team2/></TabPane>
                </Tabs>
               </div>
            </div>
        )
    }
}

export default Team;