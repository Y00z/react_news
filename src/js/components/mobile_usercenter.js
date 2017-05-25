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
import {Icon, Button, Row, Col, Tabs, Upload, Modal, message, Card} from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import UploadImage from './upload_image'
const TabPane = Tabs.TabPane
class MobileUserCenter extends Component {

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
                    <Card key={index} title={data.uniquekey}
                          extra={<a target="_blank" href={`/details/${data.uniquekey}`}>查看</a>}>
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
                <MobileHeader />
                <Row>
                    <Col span={24}>
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
                </Row>
                <MobileFooter />
            </div>
        )
    }

    callback = (key) => {
        console.log(key)
    }

}

export default MobileUserCenter
