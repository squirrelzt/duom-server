import React, { Component } from 'react';
import {auth} from '../../../../common/auth';
import { Modal, Form, Icon, Input, Button, Select, message, Checkbox, DatePicker, Upload, TimePicker } from 'antd';

class FormModalx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            taskFormIds: [],
            taskFormTypeId: '',
            selectedFormId: '',
            titleVisibility: 'visible'
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
                +'&urlImg=' + this.props.init.uploadUrl;
        }
       
        auth.fetch(url,'post', {} ,(result)=>{
            if ("error" != result) {
                this.setState({
                    taskFormIds: result
               });
               this.props.callbackParent({
                    formVisible: this.state.visible,
                    taskFormIds: this.state.taskFormIds,
                    taskFormTypeId: this.state.taskFormTypeId
                });
            }
        });
    }

    componentWillMount(){}
   
    onSave(e) {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
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
            formVisible: false,
            taskFormIds: this.state.taskFormIds,
            taskFormTypeId: this.state.taskFormTypeId
        });
    }
    onSelect(value) {
        this.setState({
            selectedFormId: value
        });
        if (value == 1) {
            this.setState({
                titleVisibility: 'visible'
            });
        } else if (value == 2) {
            this.setState({
                titleVisibility: 'hidden'
            });
        }

    }
    render() {
        this.state.visible = this.props.init.visible;
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
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
                        
                        <Form.Item label="标题" className="formmodal-title" style={{visibility: this.state.titleVisibility}}>
                            {getFieldDecorator('title')(
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
FormModalx = Form.create()(FormModalx);
export default FormModalx;