import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/jobinfo.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Form, Input, Button, DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;

let columns = [{
    title: '任务单ID',
    dataIndex: 'jobListId'
  },{
    title: '任务ID',
    dataIndex: 'jobId'
  },{
    title: '任务名称',
    dataIndex: 'jobname'
  },{
    title: '获得佣金',
    dataIndex: 'commission'
  },{
    title: '状态',
    dataIndex: 'state'
  },{
    title: '时间',
    dataIndex: 'time'
  }];

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

class JobInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        auth.fetch('/user/listJobs','post',params,(result)=>{
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
        this.fetch();
        this.props.form.validateFields();
    };

    callback() {

    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div id="jobinfo-container">
               <div className="total">
                    <div className="total-section">
                        <div>完成任务数</div>
                        <div>100</div>
                    </div>
                    <div className="total-section">
                        <div>领取任务数</div>
                        <div>120</div>
                    </div>
                    <div className="total-section">
                        <div>进行中任务数</div>
                        <div>20</div>
                    </div>
               </div>
               <div className="">
                     <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item label="任务单ID">
                            {getFieldDecorator('jobListId')(
                                <Input placeholder="请输入用户单ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务ID">
                            {getFieldDecorator('jobId')(
                                <Input placeholder="请输入任务ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('state', {initialValue: "已通过"})(
                                <Select>
                                    <Select.Option value="agree">已通过</Select.Option>
                                    <Select.Option value="reject">被驳回</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="领取时间">
                            {getFieldDecorator('time')(
                                <RangePicker />,
                            )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
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
               <div className="">
                    <Table columns={columns}
                            rowKey={data => data.jobListId} 
                            dataSource={this.state.data}
                            />
               </div>
            </div>
        )
    }
}

JobInfo = Form.create()(JobInfo);
export default JobInfo;