import React, { Component } from 'react';
import auth from '../../../../common/auth';
import { Modal, Button, Divider, message } from 'antd';
import './css/checkx.css'; 

class Checkx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visible: false,
            id:'',
            channelFromId:'',
            taskName: ''
        };
    }
    

    fetch(params) {
        let putParams='?id=' + parseInt(this.state.id) +'&channelFromId='+parseInt(this.state.channelFromId)+'&status='+parseInt(params.status);
        auth.fetch('/v1/taskOrders/users/'+localStorage.userId + putParams,'put', {} ,(result)=>{
            console.log("================");
            console.log(result);
            if (200 != result) {
                if (params.status == '1') {
                    message.info('审核通过成功');
                } else if (params.status == '2') {
                    message.info('驳回成功');
                }
                this.handleReset();
            }
        });
    }

    componentWillMount(){
        // console.log('---------------------------');
        // console.log(this.props.match.params.id);
        // this.fetch();
    };
   
    onAgree(e) {
        e.preventDefault();
        this.fetch({
            status: 1
        });
    }

    onReject(e) {
        // e.preventDefault();
        this.fetch({
            status: 2
        });
    }
    handleReset(e) {
        this.props.callbackParent({
            visible: false
        });
    }
    render() {
        this.state.visible = this.props.init.visible;
        this.state.data = this.props.init.data;
        this.state.id = this.props.init.id;
        this.state.channelFromId = this.props.init.channelFromId;
        this.state.taskName = this.props.init.taskName;
        return (
            <Modal id="check-cancel-content-container"
                title="新增核销表单"
                // onOk = { this.handOk.bind(this) }
                onCancel = { this.handleReset.bind(this) }
                visible = { this.state.visible }
                footer = {[]}>
                    {this.state.data.length != 0 ?
                        this.state.data.map((item,key)=>{
                            return <div key={item.id}>
                                {key != 0?
                                <Divider/>:""}
                                        <div className="taskName">
                                            <span>任务名称:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.taskName}</span>
                                        </div>
                                        <div className="request-id">
                                            <span>申请人ID:&nbsp;&nbsp;&nbsp;&nbsp;{item.userId}</span>
                                        </div>
                                        {item.type == 1 ?
                                           <div>标题:&nbsp;&nbsp;&nbsp;&nbsp;{item.title}</div>
                                        :<div>
                                            <img className="check-img" src={item.content}></img>
                                        </div>}
                                        <div className="content">

                                        </div>
                                    </div>
                        })
                    :""}
                
                
                <div className="check-btn">
                    <Button type="primary" className="agree" onClick={this.onAgree.bind(this)}>
                        审核通过
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button className="reject" onClick={this.onReject.bind(this)}>
                        驳回
                    </Button>
                </div> 
            </Modal>
        )
    }
}
export default Checkx;