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
            comments: null,
            collection:null
        }
    }

    componentDidMount() {
        const params = {
            action: 'getuc',
            userid: localStorage.userId
        }
        request.get(conf.api.myCollection, params)
            .then(response => {
                if (response && response.length > 0) {
                    response.reverse()
                    this.setState({
                        collection: response.slice(0, 8)
                    })
                } else {
                    message.error('SORRY,获取收藏失败。');
                }
            })
            .catch(err => {
                message.error('SORRY,网络错误,获取收藏失败,请重试。');
                console.log('获取收藏失败')
                console.log(JSON.stringify(err))
            })

        this._getComments()
    }

    _getComments = ()=>{
        const params = {
            action: 'getusercomments',
            userid: localStorage.userId
        }
        request.get(conf.api.myComments, params)
            .then(response => {
                console.log(response)
                if (response && response.length > 0) {
                    response.reverse()
                    this.setState({
                        comments: response.slice(0, 8)
                    })
                } else {
                    message.error('SORRY,获取评论失败。');
                }
            })
            .catch(err => {
                message.error('SORRY,网络错误,获取评论失败,请重试。');
                console.log('获取评论失败')
                console.log(JSON.stringify(err))
            })
    }

    _renderComments = ()=>{
        var itemArr = []
        console.log(this.state.comments)
        var comments = this.state.comments
        if (comments && comments.length > 1) {
            comments.map((data, index) => {
                console.log(data.title)
                itemArr.push(
                    <Card key={index} title={`于 ${data.datetime} 评论了文章 ${data.uniquekey}`}
                          extra={<a target="_blank" href={`/details/${data.uniquekey}`}>查看</a>}>
                        <p>{data.Comments}</p>
                    </Card>
                )
            })
        } else {
            itemArr.push(
                <h1>暂无评论列表。</h1>
            )
        }
        return itemArr
    }

    renderData = () => {
        var itemArr = []
        var collection = this.state.collection
        if (collection && collection.length > 1) {
            collection.map((data, index) => {
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
                <PcHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs onChange={(key) => this.callback(key)} type="card">
                            <TabPane tab="我的收藏列表" key="1">
                                {this.renderData()}
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                {this._renderComments()}
                            </TabPane>
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