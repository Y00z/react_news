/**
 * Created by Yooz on 2017/5/23.
 */

import React, {Component} from 'react'
import 'antd/dist/antd.css'
import {Row, Col, BackTop} from 'antd'
import request from './../common/request'
import conf from './../common/conf'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import './../../css/mobile.css'
class MobileNewsDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null
        }
    }

    componentWillMount() {
        const params = {
            action: 'getnewsitem',
            uniquekey: this.props.match.params.uniquekey
        }
        request.get(conf.api.newsDetail, params)
            .then(response => {
                console.log(response)
                if (response) {
                    this.setState({
                        news: response
                    })
                    document.title = this.state.news.title + " - React News | React 驱动的新闻平台"
                }
            })
            .catch(err => {
                console.log('获取新闻详情页出错')
                console.log(JSON.stringify(err))
            })
    }

    renderData = () => {
        if (this.state.news) {
            const data = (
                <div className="articleContainer" dangerouslySetInnerHTML={{__html: this.state.news.pagecontent}}></div>
            )
            console.log(data)
            return data
        }
        return <h1>没有数据，请重试</h1>
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader />
                <div class="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            {this.renderData()}
                        </Col>
                    </Row>
                    <MobileFooter />
                    <BackTop/>
                </div>
            </div>
        );
    }
}

export default MobileNewsDetails;