/**
 * Created by Yooz on 2017/5/14.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Row, Col} from 'antd';
class PcFooter extends Component {

    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="footer">
                        &copy;&nbsp;2016 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    }
}

export default PcFooter;