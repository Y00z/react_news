/**
 * Created by Yooz on 2017/5/16.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import logo from '../../image/logo.png'
import request from './../common/request';
import conf from './../common/conf';
import {
    Carousel,
    Menu,
    Icon,
    Modal,
    Button,
    Row,
    Col,
    Tabs,
    Form,
    Input,
    Checkbox
} from 'antd';
import image1 from './../../image/carousel_1.jpg';
import image2 from './../../image/carousel_2.jpg';
import image3 from './../../image/carousel_3.jpg';
import image4 from './../../image/carousel_4.jpg';
import PcNewsBlock from './pc_news_block';
import PcNewsImgBlock from './pc_news_img_block';
const TabPane = Tabs.TabPane

class PcNewContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel autoplay>
                                    <div><img src={image1} alt="image1"/></div>
                                    <div><img src={image2} alt="image2"/></div>
                                    <div><img src={image3} alt="image3"/></div>
                                    <div><img src={image4} alt="image4"/></div>
                                </Carousel>
                            </div>
                            <PcNewsImgBlock title="头条新闻" type="top" count={8} width="400" imageWidth="112" clos={3}/>
                        </div>

                        <Tabs defaultActiveKey="1" onChange={(key) => this.callback(key)}>
                            <TabPane tab="头条" key="1">
                                <PcNewsBlock type="top" count={10}/>
                            </TabPane>

                            <TabPane tab="国际" key="2">
                                <PcNewsBlock type="guoji" count={10}/>
                            </TabPane>
                        </Tabs>

                        <PcNewsImgBlock title="世界科技" type="keji" count={8} width="1130" imageWidth="112" clos={8}/>

                        <PcNewsImgBlock title="社会新闻" type="shehui" count={16} width="1130" imageWidth="112" clos={8}/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}

export default PcNewContainer


