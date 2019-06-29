import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import { Modal, Form, Input, Button, Select, message } from 'antd';

class CreateUser extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false
        };
    }
    fetch(params) {
        // console.log("------------------");
        // console.log(params);
        let t = this;
        let phone = params.phone;
        let upperUserId = params.upperUserId;
        let channelToId = params.channelToId;
        let postParams = 'phone='+phone +'&upperUserId=' + upperUserId + '&channelToId=' + channelToId;
        auth.fetch('/v1/users/c?' + postParams,'post', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
                message.success('新增用户成功');
                t.props.form.resetFields();
                t.props.callbackParent({
                    visible: false
                });
            } else if (1 != result) {
                message.error('新增用户失败');
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
            this.fetch(values);
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
    render() {
        this.state.visible = this.props.init.visible;
        const { getFieldDecorator, getFieldError, isFieldValidating, isFieldTouched, getFieldValue } = this.props.form;
        return (
            <Modal id="user-source-create-container"
                title="新增用户"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="手机号">
                            {getFieldDecorator('phone')(
                                <Input placeholder="请输入手机号" />,
                            )}
                        </Form.Item>
                        <Form.Item label="上级用户ID">
                            {getFieldDecorator('upperUserId')(
                                <Input.TextArea  />,
                            )}
                        </Form.Item>
                        <Form.Item label="用户推广渠道">
                            {getFieldDecorator('channelToId')(
                                <Input placeholder="请输入用户推广渠道" />,
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
CreateUser = Form.create()(CreateUser);
export default CreateUser;