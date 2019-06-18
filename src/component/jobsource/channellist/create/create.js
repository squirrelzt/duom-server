import React, { Component } from 'react';
import auth from './../../../../common/auth';
// import './css/create.css';
import { Modal, Form, Input, Button, Select, message, Checkbox, DatePicker } from 'antd';

class Create extends Component {
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
        let postParams = 'name=' + name + '&remark=' + remark + '&status=' + status + '&platformScale=' + platformScale;
        auth.fetch('/v1/task?' + postParams,'post', {} ,(result)=>{
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
                message.success('新增任务成功');
            } else if (1 != result) {
                message.error('新增任务失败');
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
        const config = {
            rules: [{ type: 'object', message: '请选择时间' }],
          };
        return (
            <Modal id="job-create-container"
                title="新增任务"
                onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                 <div className="">
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="任务名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入任务名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务标签">
                            {getFieldDecorator('taskLabelIds')(
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Checkbox value="1">标签一</Checkbox>
                                    <Checkbox value="2">标签二</Checkbox>
                                    <Checkbox value="3">标签三</Checkbox>
                                    <Checkbox value="4">标签四</Checkbox>
                                </Checkbox.Group>,
                                )}
                        </Form.Item>
                        <Form.Item label="渠道来源">
                            {getFieldDecorator('channelFromId')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务来源类型ID">
                            {getFieldDecorator('taskFormTypeId')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="任务来源ID">
                            {getFieldDecorator('taskFormIds')(
                                <Input placeholder="" />,
                            )}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {getFieldDecorator('startTime', config)(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator('endTime', config)(<DatePicker />)}
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
                        <Form.Item label="任务时间">
                            {getFieldDecorator('taskDuration')(
                                <Input.TextArea  />,
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
Create = Form.create()(Create);
export default Create;