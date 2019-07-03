import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import { Modal, Form, Input, Button, message } from 'antd';
import './css/GrantCommission.css';

class GrantCommission extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            channelToId:''
        };
    }
    fetch(params) {
        let t = this;
        let id = this.state.id;
        let postParams = this.state.channelToId+'?changed='+params;
        console.log(postParams);
        auth.fetch('/v1/cashout/channelTo/' + postParams,'post', {} ,(result)=>{
            console.log(result);
            if ("error" != result) {
                message.success('发放佣金成功');
                t.props.form.resetFields();
                t.props.callbackParent({
                    visible: false
                });
            } else {
                message.error('发放佣金失败');
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
        this.state.channelToId = this.props.init.channelToId;
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
            <Modal id="grant-commission-container"
                title="发放佣金"
                onOk={this.handOk}
                onCancel={this.handleReset}
                visible={this.state.visible}
                footer={[]}>
                 <div className="">
                     <Form {...formItemLayout}>
                        <Form.Item label="佣金金额">
                            {getFieldDecorator('changed')(
                                <Input placeholder="请输入要发放的佣金金额" />,
                            )}
                        </Form.Item>
                        <div className="recharge-btn">
                            <Button type="primary" onClick={this.onSave}>
                                确定
                            </Button>
                        </div> 
                    </Form>
                  </div>
            </Modal>
        )
    }
}
GrantCommission = Form.create()(GrantCommission);
export default GrantCommission;