/**
 * Created by Yooz on 2017/5/15.
 */

'use strict'

module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    },
    apiKey: "3fbf90b20cfdefe1d91cefba2ef92c76",
    api: {
        // login: 'http://rapapi.org/mockjs/19034/login',
        login :'http://newsapi.gugujiankong.com/Handler.ashx',
        getNews: 'http://newsapi.gugujiankong.com/Handler.ashx',
        newsDetail  : 'http://newsapi.gugujiankong.com/Handler.ashx',
        commentsList : 'http://newsapi.gugujiankong.com/Handler.ashx',
        comment : 'http://newsapi.gugujiankong.com/Handler.ashx',
        collection : 'http://newsapi.gugujiankong.com/Handler.ashx',
        myCollection : 'http://newsapi.gugujiankong.com/Handler.ashx',
        myComments : 'http://newsapi.gugujiankong.com/Handler.ashx'
    }
}