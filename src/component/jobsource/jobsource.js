import React, { Component } from 'react';
import auth from './../../common/auth';
import './css/jobsource.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Tabs, Form, Input, Button, DatePicker, Select } from 'antd';
const { TabPane } = Tabs;

let columns = [{
    title: '任务来源渠道ID',
    dataIndex: 'id'
  },{
    title: '任务来源渠道名',
    dataIndex: 'name'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '状态',
    dataIndex: 'status',
    render(text) {
        switch (text) {
            case 0:
              return <span>启用</span>;
              break;
            case 1:
              return <span>禁用</span>;
              break;
          }
    }
  },{
    title: '平台服务费',
    dataIndex: 'platformScale'
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '是否删除',
    dataIndex: 'isDeleted'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
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
        auth.fetch('/v1/user/' + localStorage.userId + '/channelfroms','get',{},(result)=>{
            console.log("------------------");
            console.log(result);
            if ("1" != result) {
                this.setState({
                    data: result
                });
            }
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
        this.fetch({
            "idList": []
        });
    };
    callback() {

    }
    onQuery(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.fetch({
                params: JSON.stringify(values)
            });
          }
        });
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
                            {getFieldDecorator('id')(
                                <Input placeholder="请输入渠道ID/渠道名" />,
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('status', {initialValue: "0"})(
                                <Select>
                                    <Select.Option value="0">启用</Select.Option>
                                    <Select.Option value="1">禁用</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.onQuery.bind(this)}>
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
                        rowKey={data => data.id} 
                        dataSource={this.state.data}
                        />
                </div>
            </div>
        )
    }
}
JobSource = Form.create()(JobSource);
export default JobSource;