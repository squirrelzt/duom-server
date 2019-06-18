import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/channelList.css';
import { Table, Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;

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

class JobManage extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params) {
        auth.fetch('/v1/tasks/c','get', {} ,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };
    componentWillMount(){
        // this.fetch(this.props.match.params.id);
        this.fetch();
    };
    onQuery(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.status = parseInt(values.status);
            this.fetch(values);
          }
        });
      }
    handleReset() {
        this.props.form.resetFields();
    }
    render() {
        console.log('-----------------')
        console.log(this.props);
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="jobmanage-container">
                <div className="">
                     <Form layout="inline">
                        <Form.Item label="任务">
                            {getFieldDecorator('task')(
                                <Input placeholder="任务" />,
                            )}
                        </Form.Item>
                        <Form.Item label="类型">
                            {getFieldDecorator('status', {initialValue: "1"})(
                                <Select>
                                    <Select.Option value="1">APP普通任务</Select.Option>
                                    <Select.Option value="2">京东零元购</Select.Option>
                                    <Select.Option value="3">淘宝零元购</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
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
JobManage = Form.create()(JobManage);
export default JobManage;