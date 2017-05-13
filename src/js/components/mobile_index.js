/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import MoboleHeader from './mobile_header'
import MoboleFooter from './mobile_footer'
import './../../css/mobile.css'


class MoboleIndex extends Component {
    render() {
        return (
            <div>
                <MoboleHeader />
                <MoboleFooter />
            </div>
        );
    }
}

export default MoboleIndex;