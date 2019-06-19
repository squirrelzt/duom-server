import React, { Component } from 'react';
import auth from './../../../../common/auth';
import './css/workorder.css';
import { Table, Modal, Form, Input, Button, Select, message, Tabs } from 'antd';

let columns = [{
    title: '任务来源渠道ID',
    dataIndex: 'id'
  },{
    title: '任务来源渠道名',
    dataIndex: 'name'
  },{
    title: '佣金',
    dataIndex: 'commission'
  },{
    title: '渠道来源ID',
    dataIndex: 'channelFromId'
  },{
    title: '数量',
    dataIndex: 'count'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  }];

class Audited extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    fetch(params) {
      let channelFromId = this.props.match.params.id;
      let bUserId = localStorage.userId;
      let url = '/v1/taskOrders/channelFrom/' + channelFromId + '?bUserId='+bUserId+'&status=1';
      if (params != null) {
        url += ('&taskId=' + params);
      }
      auth.fetch(url,'get', {} ,(result)=>{
          if (400 != result && "1" != result) {
            this.setState({
              data: result
            });
          }
          
      });
    };

    componentWillMount(){
      this.fetch();
    };
 
    onQuery(e) {
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
                        {/* <Form.Item label="分类">
                            {getFieldDecorator('status', {initialValue: "1"})(
                                <Select>
                                    <Select.Option value="1">APP普通任务</Select.Option>
                                    <Select.Option value="2">京东零元购</Select.Option>
                                    <Select.Option value="3">淘宝零元购</Select.Option>
                                </Select>,
                            )}
                        </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" onClick={this.onQuery.bind(this)}>
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleReset.bind(this)}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
                <Table columns={columns}
                    rowKey={data => data.id}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}
Audited = Form.create()(Audited);
export default Audited;