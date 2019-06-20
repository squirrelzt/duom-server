import React, { Component } from 'react';
import moment from 'moment';
import auth from './../../../../common/auth';
// import './css/create.css';
import { Modal, Form, Icon, Input, Button, Select, message, Checkbox, DatePicker, Upload } from 'antd';

class Create extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            uploadUrl: '',
            taskFormIds: [],
            taskFormTypeId: ''
        };
    }
    
    fetchUpload(params) {
        auth.fetch('/v1/taskForm?bUserId='+ localStorage.userId +'&taskFormTypeId=2&urlImg=' + this.state.uploadUrl,'post', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
               this.setState({
                 taskFormIds: result
               });
            //    console.log(this.state.taskFormIds);
               this.fetch(params);
               
            }
        });
    }
    fetch(params) {
        let name = params.name;
        let taskLabelIds = params.taskLabelIds;
        let count = params.count;
        let commision = params.commision;
        let startTime = params.startTime;
        let endTime = params.endTime;
        let taskDuration = params.taskDuration;
        let postParams = 'name=' + name + '&taskLabelIds=' + taskLabelIds.join(',') + '&count=' + count + '&commision=' + commision
        +'&bUserId='+localStorage.userId+'&channelFromId='+this.props.match.params.id+'&taskFormTypeId='+this.state.taskFormTypeId
        +'&taskFormIds='+this.state.taskFormIds.join(',')+'&startTime='+startTime+'&endTime='+endTime+'&taskDuration='+taskDuration;
        if (name != null) {
            // postParams += 'name=' + name;
        } else {
            // postParams += 'name=' + name;
        }
        if (name != null) {

        }
        // console.log('++++++++++++++++++++++');
        // console.log(postParams);
        auth.fetch('/v1/task?' + postParams,'post', {} ,(result)=>{
            console.log("------------------");
            console.log(result);
            if (200 != result) {
                message.success('新增任务成功');
                this.handleReset(e);
            } else if (1 != result) {
                message.error('新增任务失败');
            }
        });
    };

    componentWillMount(){
        
    };
   
    onSave(e) {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.status = parseInt(values.status);
            // console.log('--------------------------');
            // console.log(values);
            // console.log(this.state.uploadUrl);
            // values.startTime = moment(values.startTime).format('YYYYMMDDss');
            // values.endTime = moment(values.endTime).format('YYYYMMDDss');
            values.startTime = moment().unix(values.startTime);
            values.endTime = moment().unix(values.endTime);
            // t.handleReset(e);
            this.fetchUpload(values);
            
          }
        });
    }
    handOk() {

    }
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
        this.props.callbackParent({
            visible: false
        });
    }
    onUploadChange(info) {
        this.setState({
            uploadUrl: info.file.response
        });
        if (info.file.type.search('image')) {
            this.setState({
                taskFormTypeId: 2
            });
        } else if (info.file.type.search('text')) {
            this.setState({
                taskFormTypeId: 1
            });
        }
    }
    render() {
        const props = {
            name: 'file',
            action: auth.getPath() + '/v1/file/upload',
            headers: {
              authorization: 'authorization-text',
            },
            onChange: this.onUploadChange.bind(this)
        };
        this.state.visible = this.props.init.visible;
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
        const config = {
            rules: [{ type: 'object', message: '请选择时间' }],
          };
        return (
            <Modal id="job-create-container"
                title="新增任务"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="任务名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入任务名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务标签">
                            {getFieldDecorator('taskLabelIds')(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Checkbox value="1">标签一</Checkbox>
                                    <Checkbox value="2">标签二</Checkbox>
                                    <Checkbox value="3">标签三</Checkbox>
                                    <Checkbox value="4">标签四</Checkbox>
                                </Checkbox.Group>,
                                )}
                        </Form.Item>
                        <Form.Item label="设置数量">
                            {getFieldDecorator('count')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="用户佣金">
                            {getFieldDecorator('commision')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {getFieldDecorator('startTime', config)(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator('endTime', config)(<DatePicker />)}
                        </Form.Item>
                        
                        <Form.Item label="上传安装包">
                        <Upload {...props}>
                            <Button>
                            <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                        </Form.Item>
                        <Form.Item label="任务领取后有效时间">
                            {getFieldDecorator('taskDuration')(
                                <Input placeholder=""  />,
                            )}
                        </Form.Item>
                        <div className="form-btn">
                            <Button type="primary" className="save" onClick={this.onSave.bind(this)}>
                                保存
                            </Button>
                            <Button className="cancel" onClick={this.handleReset.bind(this)}>
                                取消
                            </Button>
                           </div> 
                    </Form>
               </div>
            </Modal>
        )
    }
}
Create = Form.create()(Create);
export default Create;