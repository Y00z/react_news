/**
 * Created by Yooz on 2017/5/16.
 */
import React, {Component} from 'react';
import {Card} from 'antd';
import request from './../common/request';
import conf from './../common/conf';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
class PcNewsImgBlock extends Component {
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
        //组
        var clos = this.props.clos;
        var cellWidth = this.props.imageWidth;
        var leftMargin = (this.props.width - cellWidth * clos) / (clos + 1);
        const imageStyle = {
            width: cellWidth,
            height: 90,
        }
        const h3Style = {
            color:'black',
            width: cellWidth,
            whiteSpace: "nowrap",   //只显示一行
            overflow: 'hidden',         //清除浮动
            textOverflow: 'ellipsis',  //多余省略号
        }
        var itemArr = []
        var news = this.state.news
        if (news && news.length > 0) {
            news.map((data, index) => {
                itemArr.push(
                    <div key={index} style={{float: 'left', marginLeft: leftMargin, marginTop: 5}}>
                        <Link to={{pathname: "/details/" + data.uniquekey}} target="_blank">
                            <div>
                                <img src={data.thumbnail_pic_s}
                                     alt={data.thumbnail_pic_s}
                                     style={imageStyle}/>
                            </div>
                            <div className="pc-image-news-title">
                                <h4 style={h3Style}>{data.title}</h4>
                                <p>{data.author_name}</p>
                            </div>
                        </Link>
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
            <div ref="card" style={{width: this.props.width, float: 'left'}}>
                <Card
                    title={this.props.title} bordered={true}
                    bodyStyle={{margin: 0, padding: 0}}>
                    {this.renderData()}
                </Card>
            </div>
        );
    }
}

export default PcNewsImgBlock;