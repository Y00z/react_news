/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import './../../css/pc.css'


class PcIndex extends Component {
    render() {
        return (
            <div>
                <PcHeader />
                <PcFooter/>
            </div>
        );
    }
}

export default PcIndex;