import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/channelcommissionlist.css';
import { Table, Divider, Form, Input, Button, Select } from 'antd';
import GrantCommission from './grantcommission/GrantCommission';

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
  }];

class ChannelCommissionList extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createVisible: false,
            grantCommissionVisible: false,
            channelToId:''
        };
    }
   

    fetch(params) {
      let getParams = '';
        if (params != null) {
            if (params.id != null && params.id != '') {
                getParams = '?id=' + params.id;
            }
            if (params.name != null && params.name != '') {
                if (getParams == '') {
                    getParams += ('?name=' + params.name);
                } else {
                    getParams += ('&name=' + params.name);
                }
            }
        }
        auth.fetch('/v1/channelTo' + getParams,'get', {} ,(result)=>{
          if ("error" != result) {
            this.setState({
              data: result
            });
          }
        });
      };
  
      componentWillMount(){
        if(columns[columns.length-1].title != "操作"){
          let opt ={
            title:'操作',
            render:this.renderFn.bind(this)
          }
          columns.push(opt);
        }
        this.fetch();
      };
      renderFn(text,record,index){
        return (
          <span>
            <span><Link to={"/channelcommission/commissionlist/comissiondetail/" + record.id}>查看详情</Link></span>
            <Divider type="vertical"/>
            <a onClick={this.onGrantCommission.bind(this,record)}>发放佣金</a>
          </span>
        )
      }
      onGrantCommission = (record) => {
        this.setState({
          grantCommissionVisible: true,
          channelToId: record.id
        });
      }
      onGrantCommissionCallback = (params) => {
        this.setState({
          grantCommissionVisible: params.visible
        });
        this.fetch();
      }
      onQuery = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if (values != null) {
              this.fetch(values);
            }
          }
        });
      }
    handleReset = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="audited-container">
              <div className="">
                     <Form layout="inline">
                        <Form.Item label="用户推广渠道ID">
                            {getFieldDecorator('id')(
                                <Input placeholder="请输入用户推广渠道ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="用户推广渠道名">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入用户推广渠道名" />,
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
                    <GrantCommission {...this.props} init={{visible:this.state.grantCommissionVisible,channelToId:this.state.channelToId}}
                     callbackParent={this.onGrantCommissionCallback}/>
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