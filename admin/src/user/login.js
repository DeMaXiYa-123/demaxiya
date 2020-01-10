import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Card, Modal, message} from 'antd';
import style from '../css/login.module.less'
import {userLogin,reg} from '../api/user'
import {setItem,getItem} from '../utils/webStorage'
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            logintype:'mgd'
        }
    }
    login=()=>{
        const {getFieldsValue} =this.props.form
        let result = getFieldsValue()
        console.log(result)
        let {logus,logps} = result
        userLogin(logus,logps).then((res)=>{
            console.log(res)
            if(res.data.msg==='ok'){
                let {token,uid,rootlist=[]} = res.data
                setItem('token',token)
                setItem('uid',uid)
                setItem('rootlist',rootlist)
                message.success('登录成功,即将跳转至首页',1,()=>{
                    // this.props.history.replace('/admin/home')
                })
            }else{
                message.error('登录失败，请检查帐号密码',1)
            }
        })
    }
    register=()=>{
        const {getFieldsValue} =this.props.form
        let result = getFieldsValue()
        let {regus,regps} = result
        reg(regus,regps).then((res)=>{
            message.success('注册成功',1)
        })
    }
    state = { visible: false };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    logintype=(type)=>{
        let l = type
        this.setState({logintype:l})
        console.log(this.state.logintype)
    }
    componentDidMount(){
        document.querySelector('.ant-card-head').style='padding: 0 20px;border-bottom:1px solid #fff'
        document.querySelector('.ant-card-body').style='padding:20px'
    }
    wechatlogin(){
        window.location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx16adbb9a9678a6c0&redirect_uri=http%3A%2F%2Fp3.gongxueyun.com%2Flogin%3Fuuid%3D1b5fc88c-209b-4657-82c9-d32f6653f065%26thirdpart%3Dwechat&response_type=code&scope=snsapi_login#wechat_redirect'
        console.log(1)
    }
    ddlogin(){
        window.location.href='https://oapi.dingtalk.com/connect/qrconnect?appid=dingoah7pforv8wnqy0xxf&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3A%2F%2Fp3.gongxueyun.com%2Flogin%3Fuuid%3D0be05597-72c7-472c-8364-5cdbe0d995c1%26thirdpart%3Ddingding'
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {logintype} = this.state
        return(
            <div className={style.login}>
                <div className={style.header}>
                    <div className={style.logo}>
                        <img src='https://www.moguding.net//static/img/logo.png'></img> 
                        工学云实习服务平台
                    </div>
                    <div>
                        <Button className={style.old} onClick={this.showModal}>
                            登录旧版界面
                        </Button>
                        <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={<div className={style.cancel} onClick={this.handleOk}>确 定</div>}
                        >
                        <p>尊敬的用户：</p>
                        <p>2.0工学云实习管理后台自2019年9月27日后，只能查看历史数据，您 的实习管理操作请在全新的3.0工学云实习管理后台里统一操作</p>
                        </Modal>
                    </div>
                </div>
                
                <div className={style.main}>
                    <Card  className={style.card}
                    title={this.state.logintype=='mgd'
                        ?<div className={style.logintype}><span  className={style.cardtitle}>蘑菇丁账号登录</span><span onClick={()=>{this.logintype('sm')}}>扫码登录</span></div>
                        :this.state.logintype=='sm'?<div className={style.logintype}><span onClick={()=>{this.logintype('mgd')}}>蘑菇丁账号登录</span><span onClick={()=>{this.logintype('sm')}} className={style.cardtitle} >扫码登录</span></div>
                        :<div className={style.reg}><span onClick={()=>{this.logintype('mgd')}} style={{fontSize:'13px',lineHeight:'24px',cursor: 'pointer'}}><Icon type="arrow-left" style={{fontSize:'10px'}} /> &nbsp;返回登录</span><p className={style.regtitle}>用户注册</p></div>
                    }>
                        {/* 登录 */}
                        <div onSubmit={this.handleSubmit} style={{display:logintype==='mgd'?'block':'none'}}>
                            <Form.Item>
                                {getFieldDecorator('logus',{
                                    rules: [{ required: true, message: '请输入账号' }],
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='text'
                                    placeholder="请输入账号"
                                    className={style.input}
                                    />
                                )} 
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('logps',{
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder="请输入密码"
                                    className={style.input}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item className={style.yzm}>
                                {getFieldDecorator('yzm',{
                                    rules: [{ required: true, message:'请输入验证码'}],
                                })(
                                    <Input
                                    placeholder="验证码"
                                    className={style.input} 
                                    />
                                )}
                                <img className={style.yzmpic} src='https://api.moguding.net:9000/session/user/v1/captcha.jpg?uuid=84b85de6-5e20-483e-849a-ea56ff28393e'></img>
                            </Form.Item>
                            <Form.Item className={style.form2}>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login} className={style.button}>
                                登录
                            </Button>
                            <a className="login-form-forgot" href="" className={style.forget}>
                                忘记密码
                            </a>
                            
                            <a onClick={()=>{this.logintype('reg')}} className={style.reg}>立即注册</a>
                            </Form.Item>
                            <img className={style.otherlog} onClick={this.wechatlogin} src='https://www.moguding.net//static/img/weixin.png'></img>
                            <img className={style.otherlog} onClick={this.ddlogin} href='https://oapi.dingtalk.com/connect/qrconnect?appid=dingoah7pforv8wnqy0xxf&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3A%2F%2Fp3.gongxueyun.com%2Flogin%3Fuuid%3D61d70386-f10e-4474-80ed-48513b6b3825%26thirdpart%3Ddingding' src='https://www.moguding.net//static/img/dingding.png'></img>
                        </div>
                        {/* 注册 */}
                        <div onSubmit={this.handleSubmit} style={{display:logintype==='reg'?'block':'none'}}>
                            <Form.Item>
                                {getFieldDecorator('regus',{
                                    rules: [{ required: true, message: '请输入手机号' }],
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='text'
                                    placeholder="请输入手机号"
                                    className={style.input}
                                    pattern={/^[1][3,4,5,7,8][0-9]{9}$/}
                                    />
                                )} 
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('regps',{
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder="请输入密码"
                                    className={style.input}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item className={style.yzm}>
                                {getFieldDecorator('yzm',{
                                    rules: [{ required: true }],
                                })(
                                    <Input
                                    placeholder="验证码"
                                    className={style.input}
                                    />
                                )}
                                <span className={style.sendyzm}>发送验证码</span>
                            </Form.Item>
                            <Form.Item className={style.form2}>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.register} className={style.button}>
                                注册
                            </Button>
                            <a className="login-form-forgot" href="" className={style.forget}>
                                忘记密码
                            </a>
                            
                            <a onClick={()=>{this.logintype('reg')}} className={style.reg}>立即注册</a>
                            </Form.Item>
                            <img className={style.otherlog} onClick={this.wechatlogin} src='https://www.moguding.net//static/img/weixin.png'></img>
                            <img className={style.otherlog} onClick={this.ddlogin} href='https://oapi.dingtalk.com/connect/qrconnect?appid=dingoah7pforv8wnqy0xxf&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3A%2F%2Fp3.gongxueyun.com%2Flogin%3Fuuid%3D61d70386-f10e-4474-80ed-48513b6b3825%26thirdpart%3Ddingding' src='https://www.moguding.net//static/img/dingding.png'></img>
                        </div>
                        {/* 扫码登录 */}
                        <p>111</p>
                        <div onSubmit={this.handleSubmit} style={{display:logintype==='sm'?'block':'none'}}>
                            <div><img className={style.smewm} src='https://api.moguding.net:9000/session/user/v1/proCode?sessionId=602'></img></div>
                            <p style={{textAlign:'center',paddingTop:'30px'}}>使用 蘑菇丁APP 扫码登录</p>
                            <p style={{textAlign:'center',color:'#4f78ee',fontSize:'13px',cursor:'pointer'}} onClick={()=>{this.logintype('reg')}}>立即注册</p>
                        </div>
                    </Card> 
                    <div className={style.ad}>
                        <img className={style.slogan} src='https://www.moguding.net//static/img/slogn.png'></img>
                        <img className={style.line} src='https://www.moguding.net//static/img/downcode.png'></img>
                        <img className={style.ewm} src='https://www.moguding.net//static/img/dow.png'></img>
                        <p className={style.wechatlogin}>推荐使用微信扫描</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Form.create()(Login)