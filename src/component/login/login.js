import React, { Component } from 'react';
import $ from "jquery";
import {auth} from './../../common/auth';
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

    sendVerifyCode = () => {
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
        auth.fetch('/v1/verfyCode?phone='+telephone,'post', {}, (result)=>{
            if (767 == result) {
                $('.send-success').css('visibility', 'hidden');
                $('.send-fail').css('visibility', 'visible');
                $('.send-fail').val('用户不存在');
            } else if (400 == result) {
                $('.send-success').css('visibility', 'hidden');
                $('.send-fail').css('visibility', 'visible');
                $('.send-fail').val('输入错误');
            } else if (404 == result) {
                $('.send-success').css('visibility', 'hidden');
                $('.send-fail').css('visibility', 'visible');
                $('.send-fail').val('Not Found');
            } else if ("error" == result) {
                $('.send-success').css('visibility', 'hidden');
                $('.send-fail').css('visibility', 'visible');
                $('.send-fail').val('failed');
            }
        });
    }
    fetch = (params = {}) => {
        auth.fetch('/v1/token','post',params,(result)=>{
            if ("error" == result) {
                $('.login-error').css('visibility', 'visible');
                $('.login-error').val('获取验证码失败');
            } else {
                localStorage.token = result.token;
                localStorage.userId = result.userId;
                this.props.history.push('/user/lists');
            }
        });
    }
    clearVerifyCode = () => {
        $('.verify-code-input').val('');
        $('.verifyCodeError').css('visibility', 'hidden');
    }

    login = () => {
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
        this.fetch({
            "phone": telephone,
            "verifyCode": verifyCode
        });
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
                <div className="send-success">
                    <p>验证码发送成功</p>
                </div>
                <div className="send-fail">
                    <p>验证码发送失败</p>
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
                <div className="login-error">
                    <p>登录失败</p>
                </div>
            </div>
        )
    }
}
export default Login;