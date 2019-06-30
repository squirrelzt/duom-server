import React, { Component } from 'react';
import {auth} from '../../../common/auth';
import './css/createx.css';
import { Modal, Form, Input, Button, Select, message } from 'antd';

class Createx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false
        };
    }
    fetch(params) {
        let name = params.name;
        let remark = params.remark;
        let status = params.status;
        let platformScale = params.platformScale;
        let postParams = 'bUserId='+localStorage.userId +'&name=' + name + '&remark=' + remark + '&status=' + status + '&platformScale=' + platformScale;
        console.log(postParams);
        auth.fetch('/v1/channelfroms?' + postParams,'post', {} ,(result)=>{
            if ("error" != result) {
                message.success('新增渠道成功');
            } else {
                message.error('新增渠道失败');
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
            values.status = parseInt(values.status);
            this.fetch(values);
            t.handleReset(e);
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
                title="新增渠道"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="渠道名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入渠道名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark')(
                                <Input.TextArea  />,
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('status', {initialValue: "0"})(
                                <Select>
                                    <Select.Option value="0">启用</Select.Option>
                                    <Select.Option value="1">禁用</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="平台及推广服务费百分比">
                            {getFieldDecorator('platformScale')(
                                <Input placeholder="平台及推广服务费百分比" />,
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
Createx = Form.create()(Createx);
export default Createx;