/**
 * Created by Yooz on 2017/5/14.
 */
/**
 * Created by Yooz on 2017/5/13.
 */
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import logo from '../../image/logo.png';

class MobileHeader extends Component {

    render() {
        return (
            <div id="MobileHeader">
                <header>
                    <a href="/" className="logo">
                        <img src={logo} alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                </header>
            </div>
        );
    }
}

export default MobileHeader;