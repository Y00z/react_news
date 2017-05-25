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
import {Menu, Icon, Modal, Button, Row, Col, Tabs, Form, Input, BackTop} from 'antd'
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
const TabPane = Tabs.TabPane

class PcUserCenter extends Component {
    render() {
        return (
            <div>
                <PcHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs onChange={(key) => this.callback(key)} type="card">
                            <TabPane tab="我的收藏列表" key="1"></TabPane>
                            <TabPane tab="我的评论列表" key="2"></TabPane>
                            <TabPane tab="我的头像设置" key="3"></TabPane>
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