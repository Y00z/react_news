/**
 * Created by Yooz on 2017/5/24.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import logo from '../../image/logo.png'
import request from './../common/request';
import conf from './../common/conf';
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input, Checkbox, Card} from 'antd';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: null,
            username: ''
        }
    }

    componentWillMount() {
        const params = {
            action: 'getcomments',
            uniquekey: this.props.uniquekey
        }
        request.get(conf.api.comments, params)
            .then(response => {
                console.log(response)
                if (response && response.length > 0) {
                    this.setState({
                        comments: response
                    })
                }
            })
            .catch(err => {
                console.log('获取新闻详情页评论出错')
                console.log(JSON.stringify(err))
            })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    renderData = () => {
        var itemArr = []
        var comments = this.state.comments
        console.log(comments)
        if (comments && comments.length > 0) {
            comments.map((data, index) => {
                itemArr.push(
                    <Card key={index} title={data.UserName} extra={<a href="#">发布于:{data.datetime}</a>}>
                        <p>{data.Comments}</p>
                    </Card>
                )
            })
            itemArr.reverse();
            console.log(itemArr.slice(0,8))
            return itemArr.slice(0,8);
        }else {
            itemArr.push(
                <h2>暂无评论</h2>
            )
            return itemArr
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="comments">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem label="您的评论">
                        {getFieldDecorator('comments', {
                            rules: [{required: true, message: 'Please input your comments!'}],
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
                {this.renderData()}
            </div>
        );
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
}

export default Comments = Form.create({})(Comments);