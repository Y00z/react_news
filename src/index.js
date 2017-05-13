import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/pc.css'
import PcIndex from './js/components/pc_index'

export default class Index extends React.Component{
    render(){
        return (
            <div>
                <PcIndex />
            </div>
        );
    };
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
