import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../common/auth';
import './css/subuser.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
import copy from 'copy-to-clipboard';


let columns = [{
    title: '用户ID',
    dataIndex: 'id'
  },{
    title: '用户名',
    dataIndex: 'username'
  },{
    title: '电话',
    dataIndex: 'phone'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '上级用户ID',
    dataIndex: 'userIdUpper'
  },{
    title: '推广渠道来源ID',
    dataIndex: 'channelFromId'
 },{
    title: '推广渠道ID',
    dataIndex: 'channelToId'
  },{
    title: '状态',
    dataIndex: 'status'
  
  },{
    title: '是否可用',
    dataIndex: 'enable'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <Link to={"/channelcommission/commissionlist/comissiondetail/" + record.id}>查看详情</Link>
                    <Divider type="vertical" />
                    <a href="">发放佣金</a>
                </span>;
    }
  }];

class SubUser extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    fetch(params) {
        auth.fetch('/v1/channelTo/' + params + '/users','get',{},(result)=>{
            // console.log('----------------------');
            // console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
        }
        this.fetch(this.props.match.params.id);
    };

    render() {
        return (
            <div id="subuser-container">
               
               <div className="">
                    <Table columns={columns}
                            rowKey={data => data.id}
                            dataSource={this.state.data}
                        />
               </div>
               
            </div>
        )
    }
}

export default SubUser;