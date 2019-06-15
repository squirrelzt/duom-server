import React, { Component } from 'react';
import auth from './../../../../common/auth';
import './css/team2.css';
import { Table } from 'antd';

let columns = [{
    title: '团队ID',
    dataIndex: 'teamId'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '用户名',
    dataIndex: 'username'
  }];

class Team2 extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/listTeam2','post',params,(result)=>{
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        this.fetch();
    };

    render() {
        return (
            <div id="team2-container">
               <Table columns={columns}
                        rowKey={data => data.teamId} 
                        dataSource={this.state.data}
                        />
            </div>
        )
    }
}

export default Team2;