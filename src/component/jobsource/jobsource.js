import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../common/auth';
import './css/jobsource.css';
import { Table, Divider, Form, Input, Button, Select } from 'antd';
import Create from './create/create';

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
    dataIndex: 'isDeleted',
    render(text) {
        switch (text) {
            case 0:
              return <span>否</span>;
              break;
            case 1:
              return <span>是</span>;
              break;
          }
    }
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
                    <Link to={"/job/list/basicinfo/" + record.id}>查看详情</Link>
                </span>;
    }
  }];

class JobSource extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createVisible: false
        };
    }
    fetch(params) {
        let postParams =  "?bUserId=" + localStorage.userId;
        if (params != null) {
            let id = params.id;
            let name = params.name;
            let status = params.status;
            if (id != null) {
                postParams += '&id=' + parseInt(id);
            }
            if (name != null) {
                postParams += ('&name=' + name);
            }
            
            if (status != null) {
                postParams += ('&status=' + parseInt(status));
            }
            if (offset != null) {
                postParams += ('&offset=' + parseInt(offset));
            }
            if (size != null) {
                postParams += ('&size=' + parseInt(size));
            }
            
        }
        auth.fetch('/v1/channelfroms' + postParams,'get',{},(result)=>{
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
        this.fetch();
    }
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
    onCreate() {
        this.setState({
            createVisible: true
        });
    }
    onCreateCallback(params) {
        this.setState({
            createVisible: params.visible
          });
        this.fetch({
            "idList": []
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div id="jobsource-container">
                 <div className="">
                     <Form layout="inline">
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
                            <Button onClick={this.handleReset.bind(this)}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
               <div className="user-source-add">
                   <Button type="primary" onClick={this.onCreate.bind(this)}>新增任务来源渠道</Button>
               </div>
               <Create {...this.props} init = {{ visible: this.state.createVisible }} callbackParent = { this.onCreateCallback.bind(this) }/>
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