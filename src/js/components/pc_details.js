/**
 * Created by Yooz on 2017/5/22.
 */

import React, {Component} from 'react'
import 'antd/dist/antd.css'
import logo from '../../image/logo.png'
import request from './../common/request'
import conf from './../common/conf'
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input, Checkbox} from 'antd'
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
class PcDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
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
                <div className="detailContainer" dangerouslySetInnerHTML={{__html: this.state.news.pagecontent}}></div>
            )
            console.log(data)
            return data
        }
        return <h1>没有数据，请重试</h1>
    }

    render() {
        return (
            <div>
                <PcHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        {this.renderData()}
                    </Col>
                    <Col span={6}></Col>
                    <Col span={2}></Col>
                </Row>
                <PcFooter/>
            </div>
        )
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    }
}

export default PcDetails