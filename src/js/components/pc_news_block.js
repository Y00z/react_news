/**
 * Created by Yooz on 2017/5/16.
 */
import React, {Component} from 'react';
import request from './../common/request';
import conf from './../common/conf';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
class PcNewsBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
        }
    }

    componentWillMount() {
        var params = {
            type: this.props.type,
            action: 'getnews',
            count: this.props.count,
        }
        request.get(conf.api.getNews, params)
            .then(response => {
                if (response && response.length > 0) {
                    this.setState({
                        news: response
                    })
                }
            })
    }

    renderData = () => {
        var itemArr = [];
        var news = this.state.news
        if (news && news.length > 1) {
            news.map((data, index) => {
                console.log(data.title)
                itemArr.push(
                    <li key={index}>
                        <Link to="/" style={{color: 'black'}}>{data.title}</Link>
                    </li>
                )
            })
        } else {
            itemArr.push(
                <h1>没有数据了</h1>
            )
        }
        return itemArr
    }

    render() {
        return (
            <div className="topNewsList">
                <Router>
                    <ul>
                        {this.renderData()}
                    </ul>
                </Router>
            </div>
        );
    }
}

export default PcNewsBlock;