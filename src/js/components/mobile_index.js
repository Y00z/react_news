/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import MobileNewsList from './mobile_news_list'
import {Tabs, Carousel} from 'antd';
import image1 from './../../image/carousel_1.jpg';
import image2 from './../../image/carousel_2.jpg';
import image3 from './../../image/carousel_3.jpg';
import image4 from './../../image/carousel_4.jpg';
const TabPane = Tabs.TabPane;
import './../../css/mobile.css'

class MoboleIndex extends Component {
    render() {
        return (
            <div>
                <MobileHeader />
                <Tabs
                    defaultActiveKey="1">
                    <TabPane tab="头条" key="1">
                        <div className="carousel">
                            <Carousel autoplay>
                                <div><img src={image1} alt="image1"/></div>
                                <div><img src={image2} alt="image2"/></div>
                                <div><img src={image3} alt="image3"/></div>
                                <div><img src={image4} alt="image4"/></div>
                            </Carousel>
                        </div>
                        <MobileNewsList type="top" count={8}/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileNewsList type="shehui" count={8}/>
                    </TabPane>
                    <TabPane tab="科技" key="3">
                        <MobileNewsList type="keji" count={8}/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileNewsList type="guoji" count={8}/>
                    </TabPane>
                    <TabPane tab="国内" key="5">
                        <MobileNewsList type="guonei" count={8}/>
                    </TabPane>
                    <TabPane tab="娱乐" key="6">
                        <MobileNewsList type="yule" count={8}/>
                    </TabPane>
                </Tabs>
                <MobileFooter />
            </div>
        );
    }
}

export default MoboleIndex;