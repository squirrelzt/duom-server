import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
import { Form, Icon, Input, Button, Select, message, Checkbox, DatePicker, Upload, TimePicker } from 'antd';
import './css/CreateJob.css';
import RichEditor from './richeditor';
import FormModal from './formmodal.js';

class CreateJob extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            taskFormIds: [],
            taskFormTypeId: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            formVisible: false,
            richEditorData: '',
            urlHead: '',
            urlPkgAndroid:'',
            title:'',
            urlImg:''
        };
    }
    componentWillMount(){}
    componentDidUpdate(){}
    componentWillUnmount(){}
    componentWillUpdate(){}
    componentDidMount(){
      
    }
    fetch(params) {
        console.log(this.state.taskFormIds);
        let name = params.name;
        let taskLabelIds = params.taskLabelIds;
        let count = params.count;
        let commision = params.commision;
        let startTime = params.startTime;
        let endTime = params.endTime;
        let taskDuration = params.taskDuration;
        let taskExplain = params.taskExplain;
        let androidName = params.androidName;
        let iosName = params.iosName;
        let appOpenTime = params.appOpenTime;
        let description = params.description;

        let postParams = 'name=' + name + '&taskLabelIds=' + taskLabelIds.join(',') + '&count=' + count + '&commision=' + commision
        +'&bUserId='+localStorage.userId+'&channelFromId='+this.props.match.params.id+'&taskFormTypeId='+this.state.taskFormTypeId
        +'&taskFormIds='+this.state.taskFormIds.join(',')+'&startTime='+startTime+'&endTime='+endTime+'&taskDuration='+taskDuration
        +'&taskExplain='+taskExplain+'&androidName='+androidName+'&iosName='+iosName+'&appOpenTime='+appOpenTime+'&description='+description
        +'&urlHead='+this.state.urlHead+'&urlPkgAndroid='+this.state.urlPkgAndroid;
        let t = this;
        console.log(postParams);
        auth.fetch('/v1/task?' + postParams,'post', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
                message.success('新增任务成功');
                this.handleReset();
            } else if (1 != result) {
                message.error('新增任务失败');
            }
        });
    };

   
   
    onSave(e) {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.status = parseInt(values.status);
            // console.log(values.startDate);
            values.startTime = this.timeConvert(this.state.startDate, this.state.startTime);
            values.endTime = this.timeConvert(this.state.endDate, this.state.endTime);
            // console.log(values);
            // console.log(this.refs.editor.getData());
            // this.fetchUpload(values);
            values.taskExplain = this.refs.editor.getData();
            // console.log('++++++++++++++++++++++');
            // console.log(values);
            // console.log(this.state.urlHead);
            // console.log(this.state.urlPkgAndroid);
            this.fetch(values);
          }
        });
    }

    timeConvert(date,time) {
        let timestamp = (new Date(date + ' ' + time)).getTime()/1000;
        return timestamp; 
    }
    handOk() {

    }
    handleReset(e) {
        // e.preventDefault();
        this.props.form.resetFields();
    }
    onUploadChangeUrlHead(info) {
        // console.log('------------------------');
        // console.log(info.file.response);
        this.setState({
            urlHead: info.file.response
        });
    }
    onUploadChangeAndroid(info) {
        // console.log('------------------------');
        // console.log(info.file.response);
        this.setState({
            urlPkgAndroid: info.file.response
        });
    }
    onStartDateChange(date, dateString) {
        // console.log(date, dateString);
        this.setState({
            startDate: dateString
        });
    }
    onEndDateChange(date, dateString) {
        // console.log(date, dateString);
        this.setState({
            endDate: dateString
        });
    }
    onStartTimeChange(time, timeString) {
        // console.log(time, timeString);
        this.setState({
            startTime: timeString
        });
    }
    onEndTimeChange(time, timeString) {
        // console.log(time, timeString);
        this.setState({
            endTime: timeString
        });
    }
    onCreateForm(e) {
        this.setState({
            formVisible: true
        })
    }

      onCreateCallback(params) {
        // console.log('^^^^^^^^^^^^^^^^^^');
        // console.log(params);
        this.setState({
            title: params.title,
            urlImg: params.urlImg,
            formVisible: params.visible,
            taskFormIds: params.taskFormIds,
            taskFormTypeId: params.taskFormTypeId
        });
    }
    render() {
        const urlHeadProps = {
            name: 'file',
            action: auth.getPath() + '/v1/file/upload',
            headers: {
              authorization: 'authorization-text',
              "DUOM_HEADER": localStorage.token
            },
            onChange: this.onUploadChangeUrlHead.bind(this)
        };
        const androidProps = {
            name: 'file',
            action: auth.getPath() + '/v1/file/upload',
            headers: {
              authorization: 'authorization-text',
              "DUOM_HEADER": localStorage.token
            },
            onChange: this.onUploadChangeAndroid.bind(this)
        };
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
        const config = {
            rules: [{ type: 'object', message: '请选择时间' }],
          };
        const formItemLayout = {
        labelCol: {
            xs: { span: 10 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 10 },
            sm: { span: 16 },
        },
        };
        return (
           <div id="create-job-container">
             <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="任务名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入任务名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务标签(多选)">
                            {getFieldDecorator('taskLabelIds')(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Checkbox value="1">标签一</Checkbox>
                                    <Checkbox value="2">标签二</Checkbox>
                                    <Checkbox value="3">标签三</Checkbox>
                                    <Checkbox value="4">标签四</Checkbox>
                                </Checkbox.Group>,
                                )}
                        </Form.Item>
                        <Form.Item label="任务简介">
                            {getFieldDecorator('description')(
                                <Input placeholder="请输入任务简介" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务图标">
                            <Upload {...urlHeadProps}>
                                <Button>
                                    <Icon type="uploadIcon" /> 点击上传
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="开始时间">
                        {getFieldDecorator('startDate', config)(<DatePicker onChange={this.onStartDateChange.bind(this)}/>)}
                        <TimePicker onChange={this.onStartTimeChange.bind(this)} />
                        </Form.Item>
                        <Form.Item label="结束时间">
                        {getFieldDecorator('endDate', config)(<DatePicker onChange={this.onEndDateChange.bind(this)}/>)}
                        <TimePicker onChange={this.onEndTimeChange.bind(this)} />
                        </Form.Item>
                        <Form.Item label="任务时间">
                            {getFieldDecorator('taskDuration')(
                                <Input placeholder="请输入时间" />,
                            )}(分钟)
                        </Form.Item>
                        <Form.Item label="APP打开时间">
                            {getFieldDecorator('appOpenTime')(
                                <Input placeholder="" />,
                            )}(秒:选填)
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
                        <Form.Item label="综合成本">
                            {getFieldDecorator('cost')(
                                <label></label>,
                            )}
                        </Form.Item>
                        <Form.Item label="IOS">
                            {getFieldDecorator('ios')(
                                <Checkbox>IOS</Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item label="IOS APP bundle id">
                            {getFieldDecorator('iosName')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="Android">
                            {getFieldDecorator('android')(
                                <Checkbox>Android</Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item label="Android APP包名">
                            {getFieldDecorator('androidName')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="上传Android安装包">
                            <Upload {...androidProps}>
                                <Button>
                                <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="任务说明">
                            <RichEditor ref='editor' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="addForm" onClick={this.onCreateForm.bind(this)}>添加表单</Button>
                         </Form.Item>
                        <div style={{visibility: this.state.exampleImgVisibility}}>
                            {this.state.title != ''?
                            <div>标题: &nbsp;&nbsp;{this.state.title}</div>
                            :""}
                            {this.state.urlImg != ''?
                             <div>示例图:&nbsp;&nbsp;<img src={this.state.urlImg}/></div>
                            :""}
                        </div>
                        <div className="form-btn">
                            <Button type="primary" className="save" onClick={this.onSave.bind(this)}>
                                保存
                            </Button>
                            <Button className="cancel" onClick={this.handleReset.bind(this)}>
                                取消
                            </Button>
                            <FormModal init={{visible:this.state.formVisible}}
                                callbackParent = { this.onCreateCallback.bind(this) }/>
                           </div> 
                    </Form>
           </div>
        )
    }
}
CreateJob = Form.create()(CreateJob);
export default CreateJob;