import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
import './css/workorder.css';
import { Table, Form, Input, Button } from 'antd';


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

class Reject extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    fetch(params) {
      let channelFromId = this.props.match.params.id;
      let bUserId = localStorage.userId;
      let url = '/v1/taskOrders/channelFrom/' + channelFromId + '?bUserId='+bUserId+'&status=2';
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

    componentWillMount(){
      this.fetch();
    };
 
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
  handleReset() {
      this.props.form.resetFields();
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
            </div>
        )
    }
}
Reject = Form.create()(Reject);
export default Reject;