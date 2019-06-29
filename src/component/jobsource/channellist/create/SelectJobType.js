import React, { Component } from 'react';
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
            // console.log("------------------");
            // console.log(result);
            if (200 != result) {
                message.success('新增任务成功');
                this.handleReset();
            } else if (1 != result) {
                message.error('新增任务失败');
            }
        });
    };

  
    render() {
        return (
           <div id="select-job-type-container">
               <div className="jobType app">
                   CPA任务
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