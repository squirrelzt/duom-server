import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../../common/auth';
import './css/subuser.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs } from 'antd';
import SubUserDetail from './subuserdetail';


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
    title: '推广渠道来源名',
    dataIndex: 'channelFromName'
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
    title: '注册时间',
    dataIndex: 'createTime'
  }];

class SubUser extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            // selectedId: '',
            modalVisible: false,
            modalData: []
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
        if(columns[columns.length-1].title != "操作"){
          let opt ={
            title:'操作',
            render:this.renderFn.bind(this)
          }
          columns.push(opt);
        }
        this.fetch(this.props.match.params.id);
    };
    renderFn(text,record,index){
      return (
        <span className="btn-margin">
          <a onClick={this.onLookUp.bind(this, record)}>查看</a>
        </span>
      )
    }
    fetchDetail(params) {
        auth.fetch('/v1/users/'+params+'/c','get', {} ,(result)=>{
            // console.log("================");
            // console.log(result);
            if (200 != result) {
                this.setState({
                  modalVisible: true,
                  modalData: result
                })
            }
        });
    }
    onLookUp(record) {
      // this.setState({
      //   modalVisible: true
      // });
      this.fetchDetail(record.id);
    }
    onCallback(params) {
      // console.log('^^^^^^^^^^^^^^^^^^');
      // console.log(params);
      this.setState({
        modalVisible: params.visible
      });
    }
    render() {
        return (
            <div id="subuser-container">
               <div className="">
                    <Table columns={columns}
                        scroll={{x:1200}}
                        rowKey={data => data.id}
                        dataSource={this.state.data}
                    />
               </div>
               <SubUserDetail {...this.props} init={{data:this.state.modalData,visible:this.state.modalVisible}} callbackParent={this.onCallback.bind(this)}/>
            </div>
        )
    }
}

export default SubUser;