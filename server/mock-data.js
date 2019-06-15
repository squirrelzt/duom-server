const express = require('express');
const router = express.Router();

router.post('/ftp/listFiles', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "filename":"1000",
                "filePath":null,
                "directory":true,
                "subFiles":[
                    {
                        "filename":"2018",
                        "filePath":null,
                        "directory":true,
                        "subFiles":null
                    }
                ]
            }, {
            "filename": "20190325.txt",
            "filePath": null,
            "directory": false,
            "subFiles": null
        }
        ]
    );
});

// 用户列表
router.post('/user/listUsers', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        [
            {
                "userId": "20190526A01",
                "userName": "13112344321",
                "leaderId": "13112344321",
                "channel": "XXXX渠道",
                "state": "正常",
                "registerTime": "2019-05-19 19:24:59",
                "balance": "200.00"
            },{
                "userId": "20190526A09",
                "userName": "13112344321",
                "leaderId": "13112344321",
                "channel": "XXXX渠道",
                "state": "正常",
                "registerTime": "2019-05-19 19:24:59",
                "balance": "10,1000.00"
            },{
                "userId": "20190526A10",
                "userName": "13112344321",
                "leaderId": "13112344321",
                "channel": "XXXX渠道",
                "state": "正常",
                "registerTime": "2019-05-19 19:24:59",
                "balance": "10,1000.00"
            },{
                "userId": "20190526A11",
                "userName": "13112344321",
                "leaderId": "13112344321",
                "channel": "XXXX渠道",
                "state": "已冻结",
                "registerTime": "2019-05-19 19:24:59",
                "balance": "200.00"
            },{
                "userId": "20190526A12",
                "userName": "13112344321",
                "leaderId": "13112344321",
                "channel": "XXXX渠道",
                "state": "已冻结",
                "registerTime": "2019-05-19 19:24:59",
                "balance": "10,1000.00"
            }
        ]
    );
});
module.exports = router;