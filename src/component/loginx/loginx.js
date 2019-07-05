import React, { Component } from 'react';
import {auth} from './../../common/auth';
import './../login/css/login.css';

class Loginx extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            telephoneInputValue: '',
            telephoneErrorVisibility: 'hidden',
            verifyCodeSendBtnDisabled: false,
            verifyCodeSendBtnValue: '发送验证码',
            verifyCodeInputValue: '',
            verifyCodeErrorVisibility: 'hidden',
            sendSuccessVisibility: 'hidden',
            sendFailVisibility: 'hidden',
            sendFailValue: '验证码发送失败',
            loginErrorVisibility: 'hidden',
            loginErrorValue: '登录失败',
        };
    }

    componentWillMount(){
    }

    sendVerifyCode = () => {
        let flag = true;
        let reg = /^1[3|4|5|7|8][0-9]\d{8,11}$/;
        // let telephone = $('.telephone-input').val();
        let telephone = this.state.telephoneInputValue;
        if (reg.test(telephone)) {
            flag = true;
        } else {
            // $('.telephoneError').css('visibility', 'visible');
            this.setState({
                telephoneErrorVisibility: 'visible'
            });
            flag = false;
        }
        if (!flag) {
            return;
        }
        // $('.verify-code-send-btn').attr('disabled', true);
        this.setState({
            verifyCodeSendBtnDisabled: true
        });
            let time = 60;
            let t = this;
            let timer = setInterval( function() {
                if (time == 0) {
                    clearInterval(timer);
                    // $('.verify-code-send-btn').text('重新发送');
                    // $('.verify-code-send-btn').attr('disabled', false);
                    t.setState({
                        verifyCodeSendBtnValue: '重新发送',
                        verifyCodeSendBtnDisabled: false
                    })
                } else {
                    // $('.verify-code-send-btn').text(time + '秒');
                    t.setState({
                        verifyCodeSendBtnValue: (time + '秒'),
                    })
                    time--;
                }
            }, 1000);
        auth.fetch('/v1/verfyCode?phone='+telephone,'post', {}, (result)=>{
            if (767 == result) {
                // $('.send-success').css('visibility', 'hidden');
                // $('.send-fail').css('visibility', 'visible');
                // $('.send-fail').val('用户不存在');
                t.setState({
                    sendSuccessVisibility: 'hidden',
                    sendFailVisibility: 'visible',
                    sendFailValue: '用户不存在'
                });
            } else if (400 == result) {
                // $('.send-success').css('visibility', 'hidden');
                // $('.send-fail').css('visibility', 'visible');
                // $('.send-fail').val('输入错误');
                t.setState({
                    sendSuccessVisibility: 'hidden',
                    sendFailVisibility: 'visible',
                    sendFailValue: '输入错误'
                });
            } else if (404 == result) {
                // $('.send-success').css('visibility', 'hidden');
                // $('.send-fail').css('visibility', 'visible');
                // $('.send-fail').val('Not Found');
                t.setState({
                    sendSuccessVisibility: 'hidden',
                    sendFailVisibility: 'visible',
                    sendFailValue: 'Not Found'
                });
            } else if ("error" == result) {
                // $('.send-success').css('visibility', 'hidden');
                // $('.send-fail').css('visibility', 'visible');
                // $('.send-fail').val('failed');
                t.setState({
                    sendSuccessVisibility: 'hidden',
                    sendFailVisibility: 'visible',
                    sendFailValue: 'failed'
                });
            }
        });
    }
    fetch = (params = {}) => {
        auth.fetch('/v1/token','post',params,(result)=>{
            if ("error" == result) {
                // $('.login-error').css('visibility', 'visible');
                // $('.login-error').val('获取验证码失败');
                this.setState({
                    loginErrorVisibility: 'visible',
                    loginErrorValue: '获取验证码失败'
                })
            } else {
                localStorage.token = result.token;
                localStorage.userId = result.userId;
                this.props.history.push('/home/homelistx');
            }
        });
    }
    clearVerifyCode = () => {
        // $('.verify-code-input').val('');
        // $('.verifyCodeError').css('visibility', 'hidden');
        this.setState({
            verifyCodeInputValue: '',
            verifyCodeErrorVisibility: 'hidden'
        })
    }

    login = () => {
        let telephoneCheck = true;
        // let telephone = $('.telephone-input').val();
        let telephone = this.state.telephoneInputValue;
        if (telephone == '') {
            telephoneCheck = true;
        } else {
            telephoneCheck = false;
        }
        if (telephoneCheck) {
            return;
        }
        // let verifyCode = $('.verify-code-input').val();
        let verifyCode = this.state.verifyCodeInputValue;
        this.fetch({
            "phone": telephone,
            "verifyCode": verifyCode
        });
    }
    onVerifyCodeInputhandle = (evt) => {
        // console.log('---------------------');
        // console.log(evt.target.value);
        this.setState({
            verifyCodeInputValue: evt.target.value
        })
    }
    onTelephoneInputHandel = (evt) => {
        this.setState({
            telephoneInputValue: evt.target.value
        })
    }
    render() {
        return (
            <div id="loginx-container">
                <nav>登录</nav>
                <div className="telephone">
                    <img className="telephone-img" src={require("./../login/images/ic_phone.png")}/>
                    <input className="telephone-input" placeholder="请输入手机号" value={this.state.telephoneInputValue} onChange={this.onTelephoneInputHandel}/>
                    <button className="verify-code-send-btn" disabled={this.state.verifyCodeSendBtnDisabled}onClick={this.sendVerifyCode}>{this.state.verifyCodeSendBtnValue}</button>
                </div>
                <div className="send-success" style={{visibility:this.state.sendSuccessVisibility}}>
                    <p>验证码发送成功</p>
                </div>
                <div className="send-fail" style={{visibility:this.state.sendFailVisibility}}>
                    <p>{this.state.sendFailValue}</p>
                </div>
                <div className="error telephoneError" style={{visibility:this.state.telephoneErrorVisibility}}>
                    <p>手机号格式错误</p>
                </div>
                <div className="verify-code">
                    <img className="email" src={require("./../login/images/ic_message.png")}/>
                    <input className="verify-code-input" value={this.state.verifyCodeInputValue} onChange={this.onVerifyCodeInputhandle}/>
                    <img className="close" src={require("./../login/images/btn_ic_close.png")} onClick={this.clearVerifyCode}/>
                </div>
                <div className="error verifyCodeError" style={{visibility:this.state.verifyCodeErrorVisibility}}>
                    <p>输入验证码错误</p>
                </div>
                <div className="login-commit">
                    <button className="login-btn" onClick={this.login}>登录</button>
                </div>
                <div className="login-error" style={{visibility:this.state.loginErrorVisibility}}>
                    <p>{this.state.loginErrorValue}</p>
                </div>
            </div>
        )
    }
}
export default Loginx;