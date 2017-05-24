/**
 * Created by Yooz on 2017/5/17.
 */

import React, {Component} from 'react';
import 'antd/dist/antd.css'
import request from './../common/request';
import conf from './../common/conf';
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class MobileNewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
        }
    }

    componentDidMount() {
        var params = {
            type: this.props.type,
            action: 'getnews',
            count: this.props.count,
        }
        request.get(conf.api.getNews, params)
            .then(response => {
                if (response && response.length > 0) {
                    this.setState({
                        news: response
                    })
                }
            })
    }

    renderData = () => {
        const imageStyle = {
            width: 90,
            height: 80,
        }
        const h4Style = {
            width: 100
        }
        var itemArr = []
        var news = this.state.news
        if (news && news.length > 0) {
            news.map((data, index) => {
                itemArr.push(
                    <div key={index}>
                        <Link className="newslist-root" to={{
                            pathname: '/details/' + data.uniquekey,
                        }}>
                            <div>
                                <img src={data.thumbnail_pic_s}
                                     alt={data.thumbnail_pic_s}
                                     style={imageStyle}/>
                            </div>
                            <div className="news-content">
                                <div className="news-h4">
                                    <h3 >{data.title}</h3>
                                </div>
                                <div className="news-data">
                                    <span className="realtype">{data.realtype}</span>
                                    <span>{data.date}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        } else {
            itemArr.push(
                <h1>Sorry,没有数据了</h1>
            )
        }
        return itemArr
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {this.renderData()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MobileNewsList;