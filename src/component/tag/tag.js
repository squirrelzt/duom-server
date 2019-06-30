import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../common/auth';
import './css/tag.css';
import { Table, Form, Input, Button, Select, Divider, message } from 'antd';
import CreateTag from './createtag/CreateTag';

let columns = [{
    title: '标签ID',
    dataIndex: 'id'
  },{
    title: '标签名',
    dataIndex: 'name'
  },{
    title: '备注',
    dataIndex: 'description'
  }];

class Tag extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            createTagVisible: false
        };
    }
    fetch(params) {
        let getParams = '';
        if (params != null && params.id != null) {
            getParams = '/' + params.id;
        }
        auth.fetch('/v1/taskLabel' + getParams,'get',{},(result)=>{
            if ("error" != result) {
                if (params != null && params.id != null) {
                    this.setState({
                        data:[result]
                    })
                } else {
                    this.setState({
                        data: result
                    });
                }
            }
        });
    }
    fetchDel(params) {
        let t = this;
        auth.fetch('/v1/taskLabel/' + params,'delete',{},(result)=>{
            if ("error" != result) {
               t.fetch();
            }
        });
    }
    componentWillMount(){
        if (localStorage.token == null) {
            this.props.history.push(auth.getLoginUrl());
        }
        if(columns[columns.length-1].title != "操作"){
            let opt ={
              title:'操作',
              render:this.renderFn.bind(this)
            }
            columns.push(opt);
          }
        this.fetch();
    }
    renderFn(text,record,index){
        return (
          <span className="btn-margin">
            <a onClick={this.onUpdate.bind(this, record)}>修改</a>
            <Divider type="vertical"/>
            <a onClick={this.onDelete.bind(this, record)}>删除</a>
          </span>
        )
    }
    onUpdate(record) {
    }
    onDelete(record) {
        this.fetchDel(record.id);
    }
    fetchCheck(params) {
        auth.fetch('/v1/cashout/b/users/'+params.userId+'?id='+params.id+'&administarId='+localStorage.userId+'&status='+params.status,'put',{},(result)=>{
           if ("error" != result) {
            if (result ==0 && params.status == 1) {
                message.info('审核通过');
            } else if (result ==1 && params.status == 2) {
                message.info('审核不通过');
            }
           }
        });
    };
    onQuery(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                data:[]
            });
            this.fetch({
                id: values.id
            });
          }
        });
      }
    handleReset() {
        this.props.form.resetFields();
    }
    onCreate() {
        this.setState({
            createTagVisible: true
        });
    }
    onCreateCallback(params) {
        this.setState({
            createTagVisible: params.visible
        });
        this.fetch();
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div id="cashout-container">
                 <div className="">
                     <Form layout="inline">
                        <Form.Item label="标签ID">
                            {getFieldDecorator('id')(
                                <Input placeholder="请输入标签ID" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.onQuery.bind(this)}>
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleReset.bind(this)}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
               <div className="tag-add">
                   <Button type="primary" onClick={this.onCreate.bind(this)}>新增标签</Button>
               </div>
                <div className="user-list-table">
                    <Table columns={columns}
                        rowKey={data => data.id} 
                        dataSource={this.state.data}
                        />
                </div>
                <CreateTag {...this.props} init = {{ visible: this.state.createTagVisible }} callbackParent = { this.onCreateCallback.bind(this) }/>
            </div>
        )
    }
}
Tag = Form.create()(Tag);
export default Tag;