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
import {Card} from 'antd';
class PcNewsBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
        }
    }

    componentWillMount() {
        const params = {
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
                console.log(data.uniquekey)
                itemArr.push(
                    <Link to={{pathname: '/details/' + data.uniquekey,}} target="_blank">
                        <li key={index}>
                            {/*<Link to={`details/${data.uniquekey}`} style={{color: 'black'}} target="_blank">{data.title}</Link>*/}
                            <h3 style={{
                                width: 395,
                                color: 'black',
                                whiteSpace: "nowrap",   //只显示一行
                                overflow: 'hidden',         //清除浮动
                                textOverflow: 'ellipsis',  //多余省略号
                            }}>{data.title}</h3>
                        </li>
                    </Link>
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
                    <Card bodyStyle={{padding: 0}}>
                        <ul>
                            {this.renderData()}
                        </ul>
                    </Card>
                </Router>
            </div>
        );
    }
}

export default PcNewsBlock;