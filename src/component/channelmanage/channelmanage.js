import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../common/auth';
import './css/channelmanage.css';
import { Table, Divider, Form, Input, Button, Select, DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

let columns = [{
    title: '任务推广渠道ID',
    dataIndex: 'id'
  },{
    title: '任务推广渠道名',
    dataIndex: 'name'
  },{
    title: '收入',
    dataIndex: 'income'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '已发金额',
    dataIndex: 'grantAmount',
    render(text,record) {
        return <span>{record.income-record.balance}</span>
    }
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '更新时间',
    dataIndex: 'updateTime'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <Link to={"/extend/extendlist/extenddetail/" + record.id}>查看详情</Link>
                </span>;
    }
  }];

class ChannelManage extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createVisible: false,
            startDate: '',
            endDate: ''
        };
    }
    fetch(params) {
        let getParams = '';
        if (params != null) {
            if (params.id != null) {
                getParams = '?id=' + params.id;
            }
            if (params.status != null) {
                if (getParams == '') {
                    getParams += ('?status=' + params.status);
                } else {
                    getParams += ('&status=' + params.status);
                }
            }
            if (this.state.startDate != '') {
                if (getParams == '') {
                    getParams += ('?startDate=' + this.state.startDate);
                } else {
                    getParams += ('&startDate=' + params.startDate);
                }
            }
        }
        auth.fetch('/v1/channelTo' + getParams,'get',{},(result)=>{
            // console.log('-----------------------');
            // console.log(result);
            if ("1" != result) {
                this.setState({
                    data: result
                });
            }
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push(auth.getLoginUrl());
        }
        this.fetch();
    }
    onQuery(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.status = parseInt(values.status);
            // console.log('------------------------------');
            // console.log(values);
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
    onRangeDateChange(date, dateString) {
        // console.log(date, dateString);
        this.setState({
            startDate: new Date(this.state.startDate).getTime()/1000,
            endDate: new Date(this.state.endDate).getTime()/1000
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div id="jobsource-container">
                 <div className="">
                     <Form layout="inline">
                        <Form.Item label="渠道">
                            {getFieldDecorator('id')(
                                <Input placeholder="请输入渠道ID" />,
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
                        <Form.Item label="添加时间">
                            {getFieldDecorator('rangeDate')(
                                <RangePicker format='YYYY-MM-DD' onChange={this.onRangeDateChange.bind(this)}/>,
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
               {/* <div className="user-source-add">
                   <Button type="primary" onClick={this.onCreate.bind(this)}>新增任务来源渠道</Button>
               </div> */}
               {/* <Create {...this.props} init = {{ visible: this.state.createVisible }} callbackParent = { this.onCreateCallback.bind(this) }/> */}
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
ChannelManage = Form.create()(ChannelManage);
export default ChannelManage;