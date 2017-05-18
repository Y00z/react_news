/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import MobileNewsList from './mobile_news_list'
import {Tabs} from 'antd';
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