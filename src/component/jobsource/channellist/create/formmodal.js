import React, { Component } from 'react';
import auth from './../../../../common/auth';
// import './css/create.css';
import { Modal, Form, Icon, Input, Button, Select, message, Checkbox, DatePicker, Upload, TimePicker } from 'antd';

class FormModal extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            taskFormIds: [],
            taskFormTypeId: ''
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
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
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

    componentWillMount(){
        
    };
   
    onSave(e) {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // values.status = parseInt(values.status);
            // values.startTime = this.timeConvert(moment(values.startDate).format('YYYY-MM-DD'), this.state.startTime);
            // values.endTime = this.timeConvert(moment(values.endDate).format('YYYY-MM-DD'), this.state.endTime);
            this.fetch(values);
            // console.log('---------------------------');
            // console.log(values);
            // console.log(this.props.init.uploadUrl);
            
          }
        });
    }

    handOk() {

    }
    handleReset(e) {
        // e.preventDefault();
        this.props.form.resetFields();
        this.setState({
            visible: false
        })
        // this.props.callbackParent({
        //     visible: false
        // });
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
                               <Select>
                                    <Select.Option value="1">文本</Select.Option>
                                    <Select.Option value="2">图片</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        
                        <Form.Item label="标题">
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
FormModal = Form.create()(FormModal);
export default FormModal;