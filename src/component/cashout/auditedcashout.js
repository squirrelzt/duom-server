import React, { Component } from 'react';
import {auth} from './../../common/auth';
import './css/cashout.css';
import { Table, Form, Input, Button } from 'antd';

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

class AuditedCashout extends Component {
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
                getParams = '&id=' + params.id;
            }
            if (params.userId != null) {
                getParams += ('&userId=' + params.userId);
            }
        }
        auth.fetch('/v1/cashout/b?status=1' + getParams,'get',{},(result)=>{
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
        this.fetch();
    }
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
AuditedCashout = Form.create()(AuditedCashout);
export default AuditedCashout;