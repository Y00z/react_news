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
import {Icon, Button, Row, Col, Tabs, Upload, Modal} from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import UploadImage from './upload_image'
const TabPane = Tabs.TabPane
class MobileUserCenter extends Component {
    render() {
        return (
            <div>
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <Tabs onChange={(key) => this.callback(key)} type="card">
                            <TabPane tab="我的收藏列表" key="1"></TabPane>
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
