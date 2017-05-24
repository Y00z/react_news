/**
 * Created by Yooz on 2017/5/24.
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

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="comments">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem label="您的评论">
                        {getFieldDecorator('comments', {
                            rules: [{required: true,message: 'Please input your comments!'}],
                        })(
                            <Input type="textarea" rows={4} placeholder="随便写"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            发表评论
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
}

export default Comments = Form.create({})(Comments);