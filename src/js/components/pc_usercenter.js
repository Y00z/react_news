/**
 * Created by Yooz on 2017/5/25.
 */
import React, {Component} from 'react';
import request from './../common/request';
import conf from './../common/conf';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
import {Menu, Icon, Modal, Button, Row, Col, message, Tabs, Form, Input, BackTop, Upload, Card} from 'antd'
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import UploadImage from './upload_image'
const TabPane = Tabs.TabPane

class PcUserCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: null
        }
    }

    componentDidMount() {
        const params = {
            action: 'getuc',
            userid: localStorage.userId
        }
        request.get(conf.api.myComment, params)
            .then(response => {
                if (response && response.length > 0) {
                    this.setState({
                        comments: response
                    })
                } else {
                    message.error('SORRY,用户名或密码错误。');
                }
            })
            .catch(err => {
                message.error('SORRY,网络错误,请重试。');
                console.log('登录失败')
                console.log(JSON.stringify(err))
            })
    }

    renderData = () => {
        var itemArr = []
        var comments = this.state.comments
        if (comments && comments.length > 1) {
            comments.map((data, index) => {
                console.log(data.title)
                itemArr.push(
                    <Card key={index} title={data.uniquekey} extra={<a target="_blank" href={`/details/${data.uniquekey}`}>查看</a>}
                          style={{width: 500}}>
                        <p>{data.Title}</p>
                    </Card>
                )
            })
        } else {
            itemArr.push(
                <h1>暂无收藏列表。</h1>
            )
        }
        return itemArr
    }

    render() {
        return (
            <div>
                <PcHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs onChange={(key) => this.callback(key)} type="card">
                            <TabPane tab="我的收藏列表" key="1">
                                {this.renderData()}
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2"></TabPane>
                            <TabPane tab="我的头像设置" key="3">
                                <UploadImage />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PcFooter />
            </div>
        );
    }

    callback = (key) => {
        console.log(key)
    }
}

export default PcUserCenter;