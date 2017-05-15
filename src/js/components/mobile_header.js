/**
 * Created by Yooz on 2017/5/14.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import logo from '../../image/logo.png'
import request from './../common/request';
import conf from './../common/conf';
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input, Checkbox} from 'antd';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

class MobileHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logined: false,
            modalVisible: false,       //登录框是否显示
            confirmDirty: false,        //注册密码确认
        }
    }

    setModalVisible = (value) => {
        this.setState({
            modalVisible: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var data = {
                    nickname: values.nickname,
                    password: values.password
                }
                console.log(data)
                request.post(conf.api.login, data)
                    .then(response => {
                        if (response && response.success) {
                            var data = response.data;
                            this.setState({
                                username: data.nickname,
                                accessToken: data.accessToken,
                                logined: true,
                                modalVisible: false
                            })
                        }
                    })
            }
        });
    }

    login = () => {
        this.setModalVisible(true)
    }

    callback = (key) => {
        console.log(key)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const logined = this.state.logined
            ?
                <Icon type="inbox"/>
            :
            <Icon style={{fontSize: 25}} type="setting" onClick={() => this.login()}/>

        return (
            <div id="MobileHeader">
                <header>
                    <a href="/" className="logo">
                        <img src={logo} alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {logined}
                </header>

                <Modal title="Modal" visible={this.state.modalVisible}
                       onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)}
                       okText="OK" cancelText="Cancel"
                       footer={null}>
                    <Tabs onChange={(key) => this.callback(key)} type="card">
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('nickname', {
                                        rules: [{message: 'Please input your username!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Username"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Password"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                                <FormItem
                                    hasFeedback={true}>
                                    {getFieldDecorator('r_nickname', {
                                        rules: [{
                                            message: 'The input is not valid username!',
                                        }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Username"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback={true}>
                                    {getFieldDecorator('r_password', {
                                        rules: [{
                                            message: 'Please input your password!',
                                        }, {
                                            validator: this.checkConfirm,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Password"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback={true}>
                                    {getFieldDecorator('r_confirm', {
                                        rules: [{
                                            message: 'Please confirm your password!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Confirm Password"
                                               onBlur={(e) => this.handleConfirmBlur(e)}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>


        );
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirm'], {force: true});
        }
        callback();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
}

export default MobileHeader = Form.create({})(MobileHeader);