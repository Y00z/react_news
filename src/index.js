import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/footer.css'
import PcIndex from './js/components/pc_index'
import MobileIndex from './js/components/mobile_index'
import MediaQuery from 'react-responsive';

export default class Index extends React.Component{
    render(){
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <PcIndex />
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <MobileIndex />
                </MediaQuery>
            </div>
        );
    };
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
