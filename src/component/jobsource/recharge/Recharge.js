import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import { Modal, Form, Input, Button, message } from 'antd';
import './css/Recharge.css';

class Recharge extends Component {
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
              console.log('----------------');
              console.log(values);
            // this.fetch(values);
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
            <Modal id="recharge-container"
                title="充值"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="充值金额">
                            {getFieldDecorator('phone')(
                                <Input placeholder="请输入充值金额" />,
                            )}
                        </Form.Item>
                      
                        <div className="recharge-btn">
                            <Button type="primary" onClick={this.onSave.bind(this)}>
                                充值
                            </Button>
                        </div> 
                    </Form>
                  </div>
            </Modal>
        )
    }
}
Recharge = Form.create()(Recharge);
export default Recharge;