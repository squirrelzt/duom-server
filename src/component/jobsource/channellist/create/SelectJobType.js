import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {auth} from './../../../../common/auth';
import { message, Card } from 'antd';
import './css/SelectJobType.css';

class SelectJobType extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    componentWillMount(){}
    componentDidUpdate(){}
    componentWillUnmount(){}
    componentWillUpdate(){}
    componentDidMount(){}
    
    fetch(params) {
        auth.fetch('/v1/task?' + postParams,'post', {} ,(result)=>{
            if ("error" != result) {
                message.success('新增任务成功');
                this.handleReset();
            } else {
                message.error('新增任务失败');
            }
        });
    };
    render() {
        return (
           <div id="select-job-type-container">
               <div className="jobType app">
                   <Link to={"/job/listsj/createjob/"+this.props.match.params.id}><span>CPA任务</span></Link>
                </div>
               <div className="jobType jd">
                    京东零元购
               </div>
               <div className="jobType taobao">
                    淘宝零元购
               </div>
           </div>
        )
    }
}
export default SelectJobType;