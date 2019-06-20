import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../common/auth';
import './css/commissiondetail.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';

let columns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '用户名',
    dataIndex: 'userName'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '任务ID',
    dataIndex: 'taskId'
  },{
    title: '分类ID',
    dataIndex: 'categoryId'
  },{
    title: '分类名',
    dataIndex: 'categoryName'
  },{
    title: '渠道来源ID',
    dataIndex: 'channelFromId'
  },{
    title: '渠道来源名',
    dataIndex: 'channelFromName'
  },{
    title: '用户佣金',
    dataIndex: 'commisionUser'
  },{
    title: '上级ID',
    dataIndex: 'userIdUpper'
 },{
    title: '上级用户ID',
    dataIndex: 'commisionUserUpper'
  },{
    title: '上上级ID',
    dataIndex: 'userIdUpper2'
 },{
    title: '上上级用户佣金',
    dataIndex: 'commisionUserUpper2'
  },{
    title: '渠道推广佣金',
    dataIndex: 'commisionPlatform'
  },{
    title: '渠道佣金',
    dataIndex: 'commisionChannelTo'
  },{
    title: '状态',
    dataIndex: 'status'
  
  },{
    title: '是否删除',
    dataIndex: 'isDeleted'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '更新时间',
    dataIndex: 'updateTime'
  },{
    title: '结束时间',
    dataIndex: 'endTime'
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

class CommissionDetail extends Component {
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
            <div id="commissiondetail-container">
               
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

export default CommissionDetail;