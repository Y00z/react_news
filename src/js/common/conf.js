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

    getHeader: {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "APPCODE 4e17db9dd2954f688d1944952fb8bcf8"
        }
    },
    apiKey: "3fbf90b20cfdefe1d91cefba2ef92c76",
    api: {
        login: 'http://rapapi.org/mockjs/19034/login',
        getNews: 'http://newsapi.gugujiankong.com/Handler.ashx'
    }
}