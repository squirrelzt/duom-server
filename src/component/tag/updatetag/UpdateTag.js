import React, { Component } from 'react';
import {auth} from './../../../common/auth';
import { Modal, Form, Input, Button, message } from 'antd';
import './css/UpdateTag.css';

class UpdateTag extends Component {
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
        let putParams = this.state.id + '?name='+this.state.name;
        auth.fetch('/v1/taskLabel/' + putParams,'put',{},(result)=>{
            if ("error" != result) {
                message.success('修改标签成功');
                t.props.form.resetFields();
                t.props.callbackParent({
                    visible: false
                });
            } else {
                message.error('修改标签失败');
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
            this.fetch(values.name);
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
            <Modal id="create-tag-container"
                title="修改标签"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form {...formItemLayout}>
                        <Form.Item label="标签名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入标签名称" />,
                            )}
                        </Form.Item>
                        <div className="form-btn">
                            <Button type="primary" className="save" onClick={this.onSave.bind(this)}>
                                保存
                            </Button>
                            <Button onClick={this.handleReset.bind(this)}>
                                取消
                            </Button>
                        </div> 
                    </Form>
                  </div>
            </Modal>
        )
    }
}
UpdateTag = Form.create()(UpdateTag);
export default UpdateTag;