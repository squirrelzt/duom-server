import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../../common/auth';
import './css/commissiondetail.css';
import { Form, Input, Button, Select, Table, Divider, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

let columns = [{
    title: 'ID',
    dataIndex: 'id'
  },{
    title: '用户名',
    dataIndex: 'userName'
  },{
    title: '用户ID',
    dataIndex: 'userId'
  },{
    title: '任务ID',
    dataIndex: 'taskId'
  },{
    title: '分类ID',
    dataIndex: 'categoryId'
  },{
    title: '分类名',
    dataIndex: 'categoryName'
  },{
    title: '渠道来源ID',
    dataIndex: 'channelFromId'
  },{
    title: '渠道来源名',
    dataIndex: 'channelFromName'
  },{
    title: '用户佣金',
    dataIndex: 'commisionUser'
  },{
    title: '上级ID',
    dataIndex: 'userIdUpper'
 },{
    title: '上级用户ID',
    dataIndex: 'commisionUserUpper'
  },{
    title: '上上级ID',
    dataIndex: 'userIdUpper2'
 },{
    title: '上上级用户佣金',
    dataIndex: 'commisionUserUpper2'
  },{
    title: '渠道推广佣金',
    dataIndex: 'commisionPlatform'
  },{
    title: '渠道佣金',
    dataIndex: 'commisionChannelTo'
  },{
    title: '状态',
    dataIndex: 'status'
  
  },{
    title: '是否删除',
    dataIndex: 'isDeleted'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  },{
    title: '更新时间',
    dataIndex: 'updateTime'
  },{
    title: '结束时间',
    dataIndex: 'endTime'
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

class CommissionDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            channleToId:'',
            rangePicker:[],
            startTime:'',
            endTime:''
        };
    }

    fetch(params) {
      let getParams = '';
      if (params != null && params.userId != null) {
        getParams = '?cUserId=' + params.userId;
      }
      if (this.state.startTime != '') {
        getParams += ('&startTime=' + auth.getTimestamp(this.state.startTime));
      }
      if (this.state.endTime != '') {
        getParams += ('&endTime=' + auth.getTimestamp(this.state.endTime));
      }
      // console.log(getParams);
      auth.fetch('/v1/channelTo/'+this.props.match.params.id+'/commisionsDetail' + getParams,'get',{},(result)=>{
          // console.log('----------------------');
          // console.log(result);
          this.setState({
              data: result
          })
      });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push(auth.getLoginUrl());
        }
        this.fetch();
    };
    onRangeDateChange(date, dateString) {
      // console.log(dateString);
      this.state.rangePicker = dateString;
      // console.log(this.state.rangePicker);
      this.state.startTime = dateString[0];
      this.state.endTime = dateString[1];
    }
    onQuery(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // console.log('------------------------------');
          // console.log(values);
          this.fetch(values);
        }
      });
    }
    handleReset() {
        this.props.form.resetFields();
    }
    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="commissiondetail-container">
               <div className="">
               <Form layout="inline">
                        <Form.Item label="用户">
                            {getFieldDecorator('userId')(
                                <Input placeholder="请输入用户ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="起止时间">
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
                    <Table columns={columns}
                        rowKey={data => data.id}
                        dataSource={this.state.data}
                    />
               </div>
               
            </div>
        )
    }
}
CommissionDetail = Form.create()(CommissionDetail);
export default CommissionDetail;