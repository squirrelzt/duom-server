import React, { Component } from 'react';
import {auth} from './../../common/auth';
import './css/cashout.css';
import { Table, Form, Input, Button, Divider, message } from 'antd';

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
        console.log(getParams);
        auth.fetch('/v1/cashout/b' + getParams,'get',{},(result)=>{
            console.log(result)
            if ("error" == result) {

            } else {
                this.setState({
                    data: result
                });
            }
        });
    };

    componentWillMount(){
        if (!localStorage.token) {
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
        if (record.status = 0) {
            return  <span className="btn-margin">
                        <a onClick={this.onAgree.bind(this, record)} >通过审核</a>
                        <Divider type="vertical"/>
                        <a onClick={this.onReject.bind(this, record)}>不通过审核</a>
                    </span>
        } else if (record.status = 1){
            return  <span> 已通过</span>
        } else if (record.status == 2) {
            return  <span> 已拒绝</span>
        }
      }
    onAgree = (record) => {
        record.status=1;
        this.fetchCheck(record);
    }
    onReject = (record) => {
        record.status=2;
        this.fetchCheck(record);
    }
    fetchCheck = (params) => {
        auth.fetch('/v1/cashout/b/users/'+params.userId+'?id='+params.id+'&administarId='+localStorage.userId+'&status='+params.status,'put',{},(result)=>{
            if ("error" != result) {
                if (result ==0 && params.status == 1) {
                    message.info('审核通过');
                } else if (result ==1 && params.status == 2) {
                    message.info('审核不通过');
                }
                this.fetch({
                    id: this.state.id,
                    userId: this.state.userId
                });
            }
        });
    };
    onQuery = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.fetch({
                id: values.id,
                userId: values.userId
            });
          }
        });
      }
    handleReset = () => {
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