import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './../../common/auth';
import './css/cashout.css';
import { Table, Form, Input, Button, Select, Divider, message } from 'antd';

let columns = [{
    title: '提现ID',
    dataIndex: 'id'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '提现金额',
    dataIndex: 'accountChanged'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '支付宝账号',
    dataIndex: 'alipayAccount'
  },{
    title: '真实姓名',
    dataIndex: 'name'
  },{
    title: '提现时间',
    dataIndex: 'createTime'
  }];

class Cashout extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params) {
        let getParams = '';
        if (params != null) {
            if (params.id != null) {
                getParams = '?id=' + params.id;
            }
            if (params.userId != null) {
                if (getParams != '') {
                    getParams += ('&userId=' + params.userId);
                } else {
                    getParams = ('?userId=' + params.userId);
                }
            }
        }
        auth.fetch('/v1/cashout/b' + getParams,'get',{},(result)=>{
            // console.log('-------------------------');
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
        if(columns[columns.length-1].title != "操作"){
            let opt ={
              title:'操作',
              render:this.renderFn.bind(this)
            }
            columns.push(opt);
          }
        this.fetch();
    }
    renderFn(text,record,index){
        return (
          <span className="btn-margin">
            <a onClick={this.onAgree.bind(this, record)}>通过审核</a>
            <Divider type="vertical"/>
            <a onClick={this.onReject.bind(this, record)}>不通过审核</a>
          </span>
        )
      }
    onAgree(record) {
        // console.log('-------------------------');
        // console.log(record);
        record.status=1;
        this.fetchCheck(record);
    }
    onReject(record) {
        record.status=2;
        this.fetchCheck(record);
    }
    fetchCheck(params) {
        auth.fetch('/v1/cashout/b/users/'+params.userId+'?id='+params.id+'&administarId='+localStorage.userId+'&status='+params.status,'put',{},(result)=>{
            // console.log('-------------------------');
            // console.log(result);
            if (result != 400 && result != 401 && result != 500) {
                if (result ==0 && params.status == 1) {
                    message.info('审核通过');
                } else if (result ==1 && params.status == 2) {
                    message.info('审核不通过');
                }
            }
        });
    };
    onQuery(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // this.fetch(values);
            this.fetch({
                id: values.id,
                userId: values.userId
            });
          }
        });
      }
    handleReset() {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div id="cashout-container">
                 <div className="">
                     <Form layout="inline">
                        <Form.Item label="提现ID">
                            {getFieldDecorator('id')(
                                <Input placeholder="请输入提现ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="用户ID">
                            {getFieldDecorator('userId')(
                                <Input placeholder="请输入用户ID" />,
                            )}
                        </Form.Item>
                        {/* <Form.Item label="状态">
                            {getFieldDecorator('status', {initialValue: "0"})(
                                <Select>
                                    <Select.Option value="0">启用</Select.Option>
                                    <Select.Option value="1">禁用</Select.Option>
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
Cashout = Form.create()(Cashout);
export default Cashout;