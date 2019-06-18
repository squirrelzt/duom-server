import React, { Component } from 'react';
import auth from './../../../common/auth';
import './css/jobinfo.css';
import { Menu, Icon, Breadcrumb, Table, Divider, Form, Input, Button, DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;

let columns = [{
    title: '任务单ID',
    dataIndex: 'categoryId'
  },{
    title: '任务单名称',
    dataIndex: 'categoryName'
  },{
    title: '任务ID',
    dataIndex: 'taskId'
  },{
    title: '任务名称',
    dataIndex: 'jobname'
  },{
    title: '佣金平台',
    dataIndex: 'commissionPlatform'
  },{
    title: '佣金渠道',
    dataIndex: 'commissionChannelTo'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '时间',
    dataIndex: 'createTime'
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
    fetch(params) {
        auth.fetch('/v1/tasks/c/users/' + params,'get',{},(result)=>{
            // console.log('-----------------------');
            // console.log(result);
            this.setState({
                jobData: result
            })
        });
    };

    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push('/login');
          }
        this.fetch(this.props.match.params.id);
        this.props.form.validateFields();
    };

    callback() {

    }
    handleReset() {
        this.props.form.resetFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.fetch(this.props.match.params.id);
          }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        return (
            <div id="jobinfo-container">
               {/* <div className="total">
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
               </div> */}
               <div className="">
                     <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item label="任务单ID">
                            {getFieldDecorator('categoryId')(
                                <Input placeholder="请输入用户单ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务ID">
                            {getFieldDecorator('taskId')(
                                <Input placeholder="请输入任务ID" />,
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('state', {initialValue: "0"})(
                                <Select>
                                    <Select.Option value="0">启用</Select.Option>
                                    <Select.Option value="1">禁用</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        {/* <Form.Item label="领取时间">
                            {getFieldDecorator('createTime')(
                                <RangePicker />,
                            )}
                        </Form.Item> */}
                        <Form.Item>
                        <Button type="primary" htmlType="submit">
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
               <div className="">
                    <Table columns={columns}
                        rowKey={data => (data.categoryId + data.taskId)} 
                        dataSource={this.state.data}
                        />
               </div>
            </div>
        )
    }
}

JobInfo = Form.create()(JobInfo);
export default JobInfo;