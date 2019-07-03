import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
import { Form, Icon, Input, Button, message, Checkbox, DatePicker, Upload, TimePicker } from 'antd';
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
            urlImg:'',
            formHtml:'',
            labels:[],
            saveDisabled:true
        };
    }
    componentWillMount(){}
    componentDidUpdate(){}
    componentWillUnmount(){}
    componentWillUpdate(){}
    componentDidMount(){
      this.fetchLabels();
    }
    fetchLabels() {
        auth.fetch('/v1/taskLabel','get', {} ,(result)=>{
            if ("error" != result) {
                this.setState({
                    labels: result
                });
            }
        });
    }
    fetch(params) {
        let name = params.name;
        let taskLabelIds = params.taskLabelIds==undefined?'':params.taskLabelIds.join(',');
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
        let taskFormIds = this.state.taskFormIds.length>0?this.state.taskFormIds.join(','):'';

        let postParams = 'name=' + name + '&taskLabelIds=' + taskLabelIds + '&count=' + count + '&commision=' + commision
        +'&bUserId='+localStorage.userId+'&channelFromId='+this.props.match.params.id+'&taskFormTypeId='+this.state.taskFormTypeId
        +'&taskFormIds='+taskFormIds+'&startTime='+startTime+'&endTime='+endTime+'&taskDuration='+taskDuration
        +'&taskExplain='+taskExplain+'&androidName='+androidName+'&iosName='+iosName+'&appOpenTime='+appOpenTime+'&description='+description
        +'&urlHead='+this.state.urlHead+'&urlPkgAndroid='+this.state.urlPkgAndroid;
        let t = this;
        auth.fetch('/v1/task?' + postParams,'post', {} ,(result)=>{
            if ("error" == result) {
                message.error('新增任务失败');
            } else {
                message.success('新增任务成功');
                t.handleReset();
            }
        });
    };

    onSave = (e) => {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values.status = parseInt(values.status);
            values.startTime = this.timeConvert(this.state.startDate, this.state.startTime);
            values.endTime = this.timeConvert(this.state.endDate, this.state.endTime);
            values.taskExplain = this.refs.editor.getData();
            this.fetch(values);
          }
        });
    }

    timeConvert = (date,time) => {
        let timestamp = (new Date(date + ' ' + time)).getTime()/1000;
        return timestamp; 
    }
    handOk = () => {

    }
    handleReset = (e) => {
        // e.preventDefault();
        this.props.form.resetFields();
    }
    onUploadChangeUrlHead = (info) => {
        this.setState({
            urlHead: info.file.response
        });
    }
    onUploadChangeAndroid = (info) => {
        this.setState({
            urlPkgAndroid: info.file.response
        });
        if (info.file.response != undefined) {
            this.setState({
                saveDisabled: false
            })
        }
    }
    onStartDateChange = (date, dateString) => {
        this.setState({
            startDate: dateString
        });
    }
    onEndDateChange = (date, dateString) => {
        this.setState({
            endDate: dateString
        });
    }
    onStartTimeChange = (time, timeString) => {
        this.setState({
            startTime: timeString
        });
    }
    onEndTimeChange = (time, timeString) => {
        this.setState({
            endTime: timeString
        });
    }
    onCreateForm = (e) => {
        this.setState({
            formVisible: true
        })
    }

      onCreateCallback = (params) => {
        this.setState({
            formVisible: params.visible,
            taskFormIds: params.taskFormIds,
            taskFormTypeId: params.taskFormTypeId
        });
        if (!params.title) {
            this.setState({
                formHtml: this.state.formHtml + '<div>标题:'+params.title+'</div>'
            });
        }
        if (!params.urlImg) {
            this.setState({
                formHtml: this.state.formHtml + `<div>示例图:<img src=`+params.urlImg+`></img></div>`
            });
        }
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
            action: auth.getPath() + '/v1/file/uploadAndroid',
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
                                    {this.state.labels.length > 0 ?
                                    this.state.labels.map(label=>{
                                        return(
                                            <Checkbox key={label.id} value={label.id}>{label.name}</Checkbox>
                                        )
                                    })
                                    :""}
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
                        {getFieldDecorator('startDate', config)(<DatePicker onChange={this.onStartDateChange}/>)}
                        <TimePicker onChange={this.onStartTimeChange} />
                        </Form.Item>
                        <Form.Item label="结束时间">
                        {getFieldDecorator('endDate', config)(<DatePicker onChange={this.onEndDateChange}/>)}
                        <TimePicker onChange={this.onEndTimeChange} />
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
                        <div className="add-form-section">
                            <Form.Item>
                                <Button type="primary" className="addForm" onClick={this.onCreateForm}>添加表单</Button>
                            </Form.Item>
                            <div dangerouslySetInnerHTML={{__html: this.state.formHtml}}></div>
                        </div>
                        <div className="form-btn">
                            <Button type="primary" className="save" onClick={this.onSave} 
                                disabled={this.state.saveDisabled}>
                                保存
                            </Button>
                            <Button className="cancel" onClick={this.handleReset}>
                                取消
                            </Button>
                            <FormModal init={{visible:this.state.formVisible}}
                                callbackParent={this.onCreateCallback}/>
                           </div> 
                    </Form>
           </div>
        )
    }
}
CreateJob = Form.create()(CreateJob);
export default CreateJob;