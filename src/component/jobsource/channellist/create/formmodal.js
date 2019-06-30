import React, { Component } from 'react';
import {auth} from './../../../../common/auth';
// import './css/create.css';
import { Modal, Form, Icon, Input, Button, Select, message, Upload } from 'antd';

class FormModal extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            taskFormIds: [],
            taskFormTypeId: '',
            selectedFormId: '',
            title: '',
            urlImg: '',
            exampleImgVisibility: 'visible',
            fileList:[]
        };
    }
    

    fetch(params) {
        this.setState({
            taskFormTypeId: params.taskFormTypeId
        })
        let url='';
        if (params.taskFormTypeId == "1") {
            url='/v1/taskForm?bUserId='+ localStorage.userId +'&taskFormTypeId='+parseInt(params.taskFormTypeId)
                + '&title='+params.title;
        } else if (params.taskFormTypeId == "2") {
            url='/v1/taskForm?bUserId='+ localStorage.userId +'&taskFormTypeId='+parseInt(params.taskFormTypeId)
                + '&title='+params.title+'&urlImg=' + this.state.urlImg;
        }
        auth.fetch(url,'post', {} ,(result)=>{
            if (200 != result) {
               this.setState({
                    taskFormIds: result
               });
               this.props.callbackParent({
                    title: this.state.title,
                    urlImg: this.state.urlImg,
                    formVisible: this.state.visible,
                    taskFormIds: this.state.taskFormIds,
                    taskFormTypeId: this.state.taskFormTypeId
                });
            }
            this.props.form.resetFields();
            this.setState({
                fileList: []
            });
        });
    }

    componentWillMount(){
        
    };
   
    onSave(e) {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                title: values.title,
                taskFormTypeId: values.taskFormTypeId
            })
            this.fetch(values);
          }
        });
    }

    handOk() {

    }
    handleReset(e) {
        // e.preventDefault();
        this.props.form.resetFields();
        this.props.callbackParent({
            urlImg:'',
            title:'',
            formVisible: false,
            taskFormIds: this.state.taskFormIds,
            taskFormTypeId: this.state.taskFormTypeId
        });
        this.props.callbackParent({
            visible: false
        });
        this.setState({
            fileList: [],
            urlImg:'',
            title:''
        });
    }
    onSelect(value) {
        // console.log('------------------------');
        // console.log(value);
        this.setState({
            selectedFormId: value
        });
        if (value == 1) {
            this.setState({
                exampleImgVisibility: 'hidden',
                urlImg:''
            });
        } else if (value == 2) {
            this.setState({
                exampleImgVisibility: 'visible'
            });
        }

    }
    onUploadChange(info) {
        // console.log('------------------------');
        // console.log(info.file.response);
        this.setState({
            fileList: [...info.fileList],
            urlImg: info.file.response
        });
        // console.log('=====================');
        // console.log(this.state.fileList);
    }
    render() {
        this.state.visible = this.props.init.visible;
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
        const props = {
            name: 'file',
            action: auth.getPath() + '/v1/file/upload',
            headers: {
              authorization: 'authorization-text',
              "DUOM_HEADER": localStorage.token
            },
            onChange: this.onUploadChange.bind(this)
        };
        return (
            <Modal id="form-create-container"
                title="新增核销表单"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="表单类型">
                            {getFieldDecorator('taskFormTypeId')(
                               <Select onChange={this.onSelect.bind(this)}>
                                    <Select.Option value="1">文本</Select.Option>
                                    <Select.Option value="2">图片</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        
                        <Form.Item label="标题" className="formmodal-title">
                            {getFieldDecorator('title')(
                                <Input placeholder=""  />,
                            )}
                        </Form.Item>
                        <Form.Item label="示例图" className="example-img" style={{visibility: this.state.exampleImgVisibility}}>
                            <Upload {...props} fileList={this.state.fileList}>
                                <Button>
                                    <Icon type="uploadIcon" /> 点击上传
                                </Button>
                            </Upload>
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
FormModal = Form.create()(FormModal);
export default FormModal;