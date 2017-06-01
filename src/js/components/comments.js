/**
 * Created by Yooz on 2017/5/24.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import request from './../common/request';
import conf from './../common/conf';
import { Button, Form, Input, message, Card} from 'antd';
const FormItem = Form.Item

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: null,
            username: '',
        }
    }

    componentWillMount() {
        const params = {
            action: 'getcomments',
            uniquekey: this.props.uniquekey
        }
        request.get(conf.api.commentsList, params)
            .then(response => {
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
                console.log(localStorage.userId);
                var data = {
                    action: 'comment',
                    userid: localStorage.userId,
                    uniquekey: this.props.uniquekey,
                    commnet: values.comments
                }
                request.get(conf.api.comment, data)
                    .then(response => {
                        if (response) {
                            message.success('评论成功。');
                        }
                        this.componentWillMount();
                    })
                    .catch(err => {
                        message.error('SORRY,网络错误,请重试。');
                        console.log('评论失败')
                        console.log(JSON.stringify(err))
                    })
            }
        });
    }

    renderData = () => {
        var itemArr = []
        var comments = this.state.comments
        if (comments && comments.length > 0) {
            comments.map((data, index) => {
                itemArr.push(
                    <Card key={index} title={data.UserName} extra={<a href="#">发布于:{data.datetime}</a>}>
                        <p>{data.Comments}</p>
                    </Card>
                )
            })
            itemArr.reverse();
            return itemArr.slice(0, 8);
        } else {
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
                            rules: [{message: 'Please input your comments!'}],
                        })(
                            <Input type="textarea" rows={4} placeholder="随便写"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            发表评论
                        </Button>
                        <Button style={{marginLeft: 20}} type="primary" htmlType="button"
                                onClick={() => this.addCollection()}>
                            收藏
                        </Button>
                    </FormItem>
                </Form>
                {this.renderData()}
            </div>
        )
    }


    addCollection = () => {
        const params = {
            action: 'uc',
            userid: localStorage.userId,
            uniquekey: this.props.uniquekey
        }
        request.get(conf.api.collection, params)
            .then(response => {
                if (response)
                    message.success('收藏成功。')
                else
                    message.success('收藏失败。');
            })
            .catch(err => {
                message.error('SORRY,网络错误,请重试。')
                console.log('收藏失败')
                console.log(JSON.stringify(err))
            })
    }
}

export default Comments = Form.create({})(Comments)