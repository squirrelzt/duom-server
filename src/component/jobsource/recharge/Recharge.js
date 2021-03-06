import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import { Modal, Form, Input, Button, message } from 'antd';
import './css/Recharge.css';

class Recharge extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            id:''
        };
    }
    fetch(params) {
        let t = this;
        let id = this.state.id;
        let postParams = id+'?bUserId='+localStorage.userId+'&changed='+params;
        auth.fetch('/v1/channelfroms/' + postParams,'put', {} ,(result)=>{
            if ("error" != result) {
                message.success('充值成功');
                t.props.form.resetFields();
                t.props.callbackParent({
                    visible: false
                });
            } else {
                message.error('充值失败');
            }
        });
    };

    componentWillMount(){
        
    };
   
    onSave = (e) => {
        e.preventDefault();
        let t = this;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.fetch(values.changed);
          }
        });
    }
    handOk = () => {

    }
    handleReset = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
        this.props.callbackParent({
            visible: false
        });
    }
    render() {
        this.state.visible = this.props.init.visible;
        this.state.id = this.props.init.id;
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
                onOk = {this.handOk}
                onCancel = {this.handleReset}
                visible = {this.state.visible}
                footer = {[]}>
                 <div className="">
                     <Form {...formItemLayout}>
                        <Form.Item label="充值金额">
                            {getFieldDecorator('changed')(
                                <Input placeholder="请输入充值金额" />,
                            )}
                        </Form.Item>
                        <div className="recharge-btn">
                            <Button type="primary" onClick={this.onSave}>
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