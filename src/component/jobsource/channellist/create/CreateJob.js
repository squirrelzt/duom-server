import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
import { Form, Icon, Input, Button, Select, message, Checkbox, DatePicker, Upload, TimePicker } from 'antd';
import './css/CreateJob.css';
import RichEditor from './richeditor';

class CreateJob extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            uploadUrl: '',
            taskFormIds: [],
            taskFormTypeId: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            formVisible: false,
            richEditorData: '',
            txtId: 0,
            imgId: 0
        };
    }
    componentWillMount(){}
    componentDidUpdate(){}
    componentWillUnmount(){}
    componentWillUpdate(){}
    componentDidMount(){}
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
        let taskExplain = params.taskExplain;
        let postParams = 'name=' + name + '&taskLabelIds=' + taskLabelIds.join(',') + '&count=' + count + '&commision=' + commision
        +'&bUserId='+localStorage.userId+'&channelFromId='+this.props.match.params.id+'&taskFormTypeId='+this.state.taskFormTypeId
        +'&taskFormIds='+this.state.taskFormIds.join(',')+'&startTime='+startTime+'&endTime='+endTime+'&taskDuration='+taskDuration
        +'&taskExplain='+taskExplain;
        if (name != null) {
            // postParams += 'name=' + name;
        } else {
            // postParams += 'name=' + name;
        }
        if (name != null) {

        }
        let t = this;
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
            console.log('++++++++++++++++++++++');
            console.log(values);
            // this.fetch(values);
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
    fetch(params) {
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

    removeTxt(k) {
        const { form } = this.props;
        // can use data-binding to get
        const txtKeys = form.getFieldValue('txtKeys');
        // We need at least one passenger
        if (txtKeys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            txtKeys: txtKeys.filter(key => key !== k),
        });
    }
    addTxt() {
        const { form } = this.props;
        // can use data-binding to get
        const txtKeys = form.getFieldValue('txtKeys');
        const nextKeys = txtKeys.concat(this.state.txtId++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            txtKeys: nextKeys,
        });
      };
      removeImg(k) {
        const { form } = this.props;
        // can use data-binding to get
        const imgKeys = form.getFieldValue('imgKeys');
        // We need at least one passenger
        if (imgKeys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            imgKeys: imgKeys.filter(key => key !== k),
        });
    }
    addImg() {
        const { form } = this.props;
        // can use data-binding to get
        const imgKeys = form.getFieldValue('imgKeys');
        const nextKeys = imgKeys.concat(this.state.imgId++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            imgKeys: nextKeys,
        });
      };
    render() {
        const props = {
            name: 'file',
            action: auth.getPath() + '/v1/file/upload',
            headers: {
              authorization: 'authorization-text',
              "DUOM_HEADER": localStorage.token
            },
            onChange: this.onUploadChange.bind(this)
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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
          };
        getFieldDecorator('txtKeys', { initialValue: [] });
        const txtKeys = getFieldValue('txtKeys');
        const txtFormItems = txtKeys.map((k, index) => (
            <Form.Item
              label='标题'
              required={false}
              key={k}
            >
              {getFieldDecorator(`formTitles[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入文本表单标题",
                  },
                ],
              })(<Input placeholder="标题" style={{ width: '60%', marginRight: 8 }} />)}
              {txtKeys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.removeTxt(k)}
                />
              ) : null}
            </Form.Item>
          ));
        getFieldDecorator('imgKeys', { initialValue: [] });
        const imgKeys = getFieldValue('imgKeys');
        const imgFormItems = imgKeys.map((k, index) => (
            <div key={k}>
                <Form.Item
                    label='标题'
                    required={false}
                    key={k+'title'}
                    >
                    {getFieldDecorator(`imgTitles[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入图片表单标题",
                        },
                        ],
                    })(<Input placeholder="标题" style={{ width: '60%', marginRight: 8 }} />
                    )}
                </Form.Item>
                <Form.Item
                    label='示例图'
                    required={false}
                    key={k+'img'}
                    >
                    {getFieldDecorator(`exampleImgs[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        
                    })(<Upload className="form-img" {...props}>
                        <Button>
                            <Icon type="uploadIcon" /> 点击上传
                        </Button>
                    </Upload>
                    )}
                    {imgKeys.length > 1 ? (
                        <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.removeImg(k)}
                        />
                    ) : null}
                </Form.Item>
            </div>
            
          ));
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
                            <Upload {...props}>
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
                            {getFieldDecorator('openTime')(
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
                            {getFieldDecorator('iosBundleId')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="Android">
                            {getFieldDecorator('android')(
                                <Checkbox>Android</Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item label="Android APP包名">
                            {getFieldDecorator('androidBundleName')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="上传Android安装包">
                            <Upload {...props}>
                                <Button>
                                <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="任务说明">
                            <RichEditor ref='editor' {...props} />
                        </Form.Item>
                        <Form.Item  label="文本表单">
                            <Button type="dashed" onClick={this.addTxt.bind(this)} style={{ width: '60%' }}>
                                <Icon type="plus" /> 添加文本表单
                            </Button>
                        </Form.Item>
                        {txtFormItems}
                        <Form.Item  label="图片表单">
                            <Button type="dashed" onClick={this.addImg.bind(this)} style={{ width: '60%' }}>
                                <Icon type="plus" /> 添加图片表单
                            </Button>
                        </Form.Item>
                        {imgFormItems}
                        {/* <Form.Item>
                            <Button className="addForm" onClick={this.onCreateForm.bind(this)}>添加表单</Button>
                         </Form.Item> */}
                        
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
        )
    }
}
CreateJob = Form.create()(CreateJob);
export default CreateJob;