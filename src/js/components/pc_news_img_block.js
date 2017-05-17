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

    onTouch = () => {
        var width = this.refs.card.style.width;
        console.log(width)
    }

    renderData = () => {
        var clos = this.props.clos;
        var cellWidth = this.props.imageWidth;
        var leftMargin = (this.props.width - cellWidth * clos) / (clos + 1);
        const imageStyle = {
            width: cellWidth,
            height: 90,
        }
        const h3Style = {
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
                        <div>
                            <img src={data.thumbnail_pic_s}
                                 alt={data.thumbnail_pic_s}
                                 style={imageStyle}/>
                        </div>
                        <div>
                            <h4 style={h3Style}>{data.title}</h4>
                            <p>{data.author_name}</p>
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
            <div ref="card" style={{width: this.props.width,float: 'left'}}>
                <Card
                    title={this.props.title} bordered={true}
                    bodyStyle={{margin: 0, padding: 0}}
                    onClick={() => this.onTouch()}>
                    {this.renderData()}
                </Card>
            </div>
        );
    }

}

export default PcNewsImgBlock;