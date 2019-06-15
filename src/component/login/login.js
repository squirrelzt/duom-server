import React, { Component } from 'react';
import $ from "jquery";
import auth from './../../common/auth';
import './css/login.css';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount(){
    }

    fetch(params = {}) {
        auth.fetch('/v1/verfyCode','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    sendVerifyCode() {
        let flag = true;
        let reg = /^1[3|4|5|7|8][0-9]\d{8,11}$/;
        let telephone = $('.telephone-input').val();
        if (reg.test(telephone)) {
            flag = true;
        } else {
            $('.telephoneError').css('visibility', 'visible');
            flag = false;
        }
        if (!flag) {
            return;
        }
        // this.fetch({
        //     "phone": telephone
        // });
        auth.fetch('/v1/verfyCode','post',{"phone": telephone},(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
        $('.verify-code-send-btn').attr('disabled', true);
        let time = 60;
        let timer = setInterval( function() {
             if (time == 0) {
                 clearInterval(timer);
                 $('.verify-code-send-btn').text('重新发送');
                 $('.verify-code-send-btn').attr('disabled', false);
             } else {
                 $('.verify-code-send-btn').text(time + '秒');
                 time--;
             }
        }, 1000);
    }

    clearVerifyCode() {
        $('.verify-code-input').val('');
        $('.verifyCodeError').css('visibility', 'hidden');
    }

    login() {
        let telephoneCheck = true;
        let telephone = $('.telephone-input').val();
        if (telephone == '') {
            telephoneCheck = true;
        } else {
            telephoneCheck = false;
        }
        if (telephoneCheck) {
            return;
        }
        var verifyCode = $('.verify-code-input').val();
        // TODO login ajax

        // test
        // if (verifyCode != '123456') {
        //     $('.verifyCodeError').css('visibility', 'visible');
        // }
    }

    render() {
        return (
            <div id="login-container">
                <nav>登录</nav>
                <div className="telephone">
                    <img className="telephone-img" src={require("./images/ic_phone.png")}/>
                    <input className="telephone-input" placeholder="请输入手机号" />
                    <button className="verify-code-send-btn" onClick={this.sendVerifyCode}>发送验证码</button>
                </div>
                <div className="error telephoneError">
                    <p>手机号格式错误</p>
                </div>
                <div className="verify-code">
                    <img className="email" src={require("./images/ic_message.png")}/>
                    <input className="verify-code-input" />
                    <img className="close" src={require("./images/btn_ic_close.png")} onClick={this.clearVerifyCode}/>
                </div>
                <div className="error verifyCodeError">
                    <p>输入验证码错误</p>
                </div>
                <div className="login-commit">
                    <button className="login-btn" onClick={this.login}>登录</button>
                </div>
            </div>
        )
    }
}
export default Login;