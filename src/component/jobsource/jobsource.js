import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/jobsource.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs, Form, Input, Button, DatePicker, Select } from 'antd';
const { TabPane } = Tabs;

let columns = [{
    title: '任务来源渠道ID',
    dataIndex: 'jobSourceChannelId'
  },{
    title: '任务来源渠道名',
    dataIndex: 'jobSourceChannelName'
  },{
    title: '状态',
    dataIndex: 'state'
  },{
    title: '平台服务费',
    dataIndex: 'platformFee'
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <a href="">禁用</a>
                    <Divider type="vertical" />
                    <a href="">查看详情</a>
                </span>;
    }
  }];

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

class JobSource extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/jobsource/listJobSourceChannels','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
        this.fetch();
    };
    callback() {

    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div id="jobsource-container">
                 <div className="">
                     <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item label="任务来源渠道">
                            {getFieldDecorator('jobSourceChannel')(
                                <Input placeholder="请输入渠道ID/渠道名" />,
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('state', {initialValue: "已通过"})(
                                <Select>
                                    <Select.Option value="agree">已通过</Select.Option>
                                    <Select.Option value="reject">被驳回</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button >
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
                <div className="user-list-table">
                    <Table columns={columns}
                        rowKey={data => data.jobSourceChannelId} 
                        dataSource={this.state.data}
                        />
                </div>
            </div>
        )
    }
}
JobSource = Form.create()(JobSource);
export default JobSource;