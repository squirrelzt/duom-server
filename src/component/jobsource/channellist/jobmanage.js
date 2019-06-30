import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../../common/auth';
import './css/channelList.css';
import { Table, Modal, Form, Input, Button, Select, message, Tabs } from 'antd';
const { TabPane } = Tabs;
import Create from './create/create';

let columns = [{
    title: '任务ID',
    dataIndex: 'id'
  },{
    title: '任务名称',
    dataIndex: 'name'
  },{
    title: '类型',
    dataIndex: 'type',
    render(text) {
        switch (text) {
            case 1:
              return <span>CPA任务</span>;
              break;
            case 2:
              return <span>京东零元购</span>;
              break;
            case 3:
              return <span>淘宝零元购</span>;
              break;
          } 
    }
  },{
    title: '佣金',
    dataIndex: 'commision'
  },{
    title: '渠道来源',
    dataIndex: 'channelFromName'
  },{
    title: '数量',
    dataIndex: 'count'
  },{
    title: '开始时间',
    dataIndex: 'startTime'
  },{
    title: '结束时间',
    dataIndex: 'endTime'
  },{
    title: '创建时间',
    dataIndex: 'createTime'
  }];

class JobManage extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createVisible: false
        };
    }
    fetch(params) {
        auth.fetch('/v1/tasks/c','get', {} ,(result)=>{
            // console.log('---------------');
            // console.log(result);
            this.setState({
                data: result
            })
        });
    };
    componentWillMount(){
        // this.fetch(this.props.match.params.id);
        this.fetch();
    };
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
        this.fetch();
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="jobmanage-container">
                <div className="">
                     <Form layout="inline">
                        <Form.Item label="任务">
                            {getFieldDecorator('task')(
                                <Input placeholder="任务" />,
                            )}
                        </Form.Item>
                        <Form.Item label="类型">
                            {getFieldDecorator('status', {initialValue: "1"})(
                                <Select>
                                    <Select.Option value="1">APP普通任务</Select.Option>
                                    <Select.Option value="2">京东零元购</Select.Option>
                                    <Select.Option value="3">淘宝零元购</Select.Option>
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
               <div className="job-source-add">
               {/* <Button type="primary" onClick={this.onCreate.bind(this)}>新增任务</Button> */}
                   <Link to={"/job/lists/jobtype/"+this.props.match.params.id}><Button type="primary">新增任务</Button></Link>
               </div>
               <Create {...this.props} init = {{ visible: this.state.createVisible }} callbackParent = { this.onCreateCallback.bind(this) }/>
                <Table columns={columns}
                    rowKey={data => data.id} 
                    scroll={{x:1200}}
                    dataSource={this.state.data}
                />
            </div>
        )
    }
}
JobManage = Form.create()(JobManage);
export default JobManage;