import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
import './css/workorder.css';
import { Table, Form, Input, Button } from 'antd';
import Check from './check.js';

let columns = [{
  title: '任务单ID',
  dataIndex: 'id'
  },{
    title: '任务ID',
    dataIndex: 'taskId'
  },{
    title: '任务名',
    dataIndex: 'taskName'
  },{
    title: '任务分类',
    dataIndex: 'taskType',
    render(text) {
      return <span>APP普通任务</span>
    }
  },{
    title: '任务来源渠道ID',
    dataIndex: 'channelFromId'
  },{
    title: '任务来源渠道名',
    dataIndex: 'channelFromName'
  },{
    title: '申请人ID',
    dataIndex: 'userId'
  },{
    title: '开始时间',
    dataIndex: 'startTime'
  },{
    title: '结束时间',
    dataIndex: 'endTime'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  }];

class UnAudited extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            checkData: [],
            checkMoalVisible: false,
            selectId:'',
            selectChannelFromId:'',
            selectTaskName: ''
        };
    }

    onCheck = (record) => {
      this.fetchCheck(record);
    }
    fetch(params) {
      let channelFromId = this.props.match.params.id;
      let bUserId = localStorage.userId;
      let url = '/v1/taskOrders/channelFrom/' + channelFromId + '?bUserId='+bUserId+'&status=0';
      if (params != null) {
        url += ('&taskId=' + params);
      }
      auth.fetch(url,'get', {} ,(result)=>{
        if ("error" != result) {
          this.setState({
            data: result
          });
        }
      });
    };
    fetchCheck(params) {
      let url = '/v1/tasks/formContent?userId=' + params.userId + '&taskId=' + params.taskId;
      auth.fetch(url,'get', {} ,(result)=>{
          if (200 != result) {
            if ("error" != result) {
              this.setState({
                checkData: result,
                checkMoalVisible: true,
                selectId: params.id,
                selectChannelFromId: params.channelFromId,
                selectTaskName: params.taskName
              });
            }
          }
      });
  }
    componentWillMount(){
      if(columns[columns.length-1].title != "操作"){
        let opt ={
          title:'操作',
          render:this.renderFn.bind(this)
        }
        columns.push(opt);
      }
      this.fetch();
    };
    renderFn(text,record,index){
      return (
        <span className="btn-margin">
          <a onClick={this.onCheck.bind(this, record)}>查看</a>
        </span>
      )
    }
    onQuery = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values != null) {
            this.fetch(values.taskId);
          }
        }
      });
    }
  handleReset = () => {
      this.props.form.resetFields();
  }
  onCallback = (params) => {
    this.setState({
        checkMoalVisible: params.visible
    });
}
    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="audited-container">
              <div className="">
                     <Form layout="inline">
                        <Form.Item label="任务">
                            {getFieldDecorator('taskId')(
                                <Input placeholder="请输入任务ID" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.onQuery}>
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleReset}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
                <Table columns={columns}
                    scroll={{x :1200}}
                    rowKey={data => data.id}
                    dataSource={this.state.data}
                />
                <Check {...this.props} init={{visible:this.state.checkMoalVisible, data:this.state.checkData,
                  id:this.state.selectId,
                  channelFromId:this.state.selectChannelFromId,
                  taskName:this.state.selectTaskName}} 
                  callbackParent={this.onCallback}/>
            </div>
        )
    }
}
UnAudited = Form.create()(UnAudited);
export default UnAudited;