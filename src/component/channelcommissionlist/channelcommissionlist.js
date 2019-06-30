import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/channelcommissionlist.css';
import { Table, Divider, Form, Input, Button, Select } from 'antd';

let columns = [{
    title: '用户推广渠道ID',
    dataIndex: 'id'
  },{
    title: '用户推广渠道名',
    dataIndex: 'name'
  },{
    title: '余额',
    dataIndex: 'balance'
  },{
    title: '收入',
    dataIndex: 'income'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '操作',
    dataIndex: 'operation',
    render(text, record) {
        return <span>
                    <Link to={"/channelcommission/commissionlist/comissiondetail/" + record.id}>查看详情</Link>
                    <Divider type="vertical" />
                    <a href="">发放佣金</a>
                </span>;
    }
  }];

class ChannelCommissionList extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createVisible: false
        };
    }
   

    fetch(params) {
        auth.fetch('/v1/channelTo','get', {} ,(result)=>{
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
                        <Form.Item label="用户推广渠道ID">
                            {getFieldDecorator('taskId')(
                                <Input placeholder="请输入用户推广渠道ID" />,
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
ChannelCommissionList = Form.create()(ChannelCommissionList);
export default ChannelCommissionList;