/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import logo from '../../image/logo.png';
import request from './../common/request';
import conf from './../common/conf';
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input} from 'antd';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

class PcHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 'toutiao',
            logined: false,            //是否已经登录
            username: null,
            modalVisible: false,       //登录框是否显示
            confirmDirty: false,        //注册密码确认
            accessToken: null,
        }
    }

    setModalVisible = (value) => {
        this.setState({
            modalVisible: value
        })
    }

    logout = () => {
        this.setState({
            logined: false
        })
    }

    handleClick = (e) => {
        console.log('click ', e);
        if (e.key === "register") {
            this.setModalVisible(true)
        } else {
            this.setState({
                current: e.key,
            });
        }
    }

    callback = (key) => {
        console.log(key)
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


    render() {
        const {getFieldDecorator} = this.props.form;
        const logined = this.state.logined
            ?
            <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="button">{this.state.username}</Button>
                &nbsp;&nbsp;
                <Button type="dashed" htmlType="button">个人中心</Button>
                <Button type="ghost" htmlType="button" onClick={() => this.logout()}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="user"/>注册/登录
            </Menu.Item>
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu
                            onClick={(e) => this.handleClick(e)}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <Menu.Item key="toutiao">
                                <Icon type="appstore"/>头条
                            </Menu.Item>

                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>

                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>

                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>

                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>

                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>

                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            {logined}
                        </Menu>
                        <Modal title="Modal" visible={this.state.modalVisible}
                               onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)}
                               okText="OK" cancelText="Cancel"
                               footer={null}>

                            <Tabs onChange={() => this.callback()} type="card">
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
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
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

export default PcHeader = Form.create({})(PcHeader);