import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../../common/auth';
import './css/subuser.css';
import { Modal, Divider, Button } from 'antd';

class SubUserDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            userData: [],
            visible: false
        };
    }

    fetch(params) {
        auth.fetch('/v1/channelTo/' + params + '/users','get',{},(result)=>{
            if ("error" != result) {
                this.setState({
                    data: result
                });
            }
        });
    };

    componentWillMount(){
        if (!localStorage.token) {
            this.props.history.push(auth.getLoginUrl());
        }
    };
    handleReset(e) {
      this.props.callbackParent({
          visible: false
      });
  }
    render() {
      this.state.visible = this.props.init.visible;
      this.state.data = this.props.init.data;
      if (this.props.init.data != null) {
        this.state.userData = this.props.init.data.user;
      }
        return (
            <Modal id="subuserdetail-container"
            title="用户详情"
            onCancel = { this.handleReset.bind(this) }
            visible = { this.state.visible }
            footer = {[]}>
              <div className="detail-content">
                {this.state.userData != null ?
                    <ul>
                      <li>用户ID:&nbsp;{this.state.userData.id}</li>
                      <li>用户名:&nbsp;{this.state.userData.username}</li>
                      <li>手机号:&nbsp;{this.state.userData.phone}</li>
                      <li>推广渠道来源ID:&nbsp;{this.state.userData.channelFromId}</li>
                      <li>推广渠道来源名:&nbsp;{this.state.userData.channelFromName}</li>
                      <li>推广渠道ID:&nbsp;{this.state.userData.channelToId}</li>
                      <li>推广渠道名:&nbsp;{this.state.userData.channelToName}</li>
                      <li>支付宝账号:&nbsp;{this.state.userData.alipayAccount}</li>
                      <li>余额:&nbsp;{this.state.userData.balance}</li>
                      <li>上级ID:&nbsp;{this.state.userData.userIdUpper}</li>
                      <li>创建时间:&nbsp;{this.state.userData.createTime}</li>
                      <li>更新时间:&nbsp;{this.state.userData.updateTime}</li>
                  </ul>
                :""}
                  <div className="check-btn">
                      <Button type="primary" className="back" onClick={this.handleReset.bind(this)}>
                          返回
                      </Button>
                  </div> 
              </div>
               
        </Modal>
        )
    }
}

export default SubUserDetail;