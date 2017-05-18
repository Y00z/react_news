/**
 * Created by Yooz on 2017/5/17.
 */

import React, {Component} from 'react';
import 'antd/dist/antd.css'
import request from './../common/request';
import conf from './../common/conf';

class MobileNewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
        }
    }

    componentDidMount() {
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
        const imageStyle = {
            width: 90,
            height: 80,
        }
        const h4Style = {
            width: 275
        }

        var itemArr = []
        var news = this.state.news
        if (news && news.length > 0) {
            news.map((data, index) => {
                itemArr.push(
                    <div key={index} className="newslist-root">
                        <div>
                            <img src={data.thumbnail_pic_s}
                                 alt={data.thumbnail_pic_s}
                                 style={imageStyle}/>
                        </div>
                        <div className="news-content">
                            <div className="news-h4" style={h4Style}>
                                <h3 >{data.title}</h3>
                            </div>
                            <div className="news-data">
                                <span className="realtype">{data.realtype}</span>
                                <span>{data.date}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            itemArr.push(
                <h1>Sorry,没有数据了</h1>
            )
        }
        return itemArr
    }

    render() {
        return (
            <div>
                {this.renderData()}
            </div>
        );
    }
}

export default MobileNewsList;