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

// 用户详情
router.post('/user/userinfo', function(req, res, next) {
    console.log("------------------------------");
    // var language = req.body['language'];
    // var token = req.body['token'];
    // var returnUrl = req.body['returnUrl'];
    // console.log(language);
    // console.log(token);
    // console.log(returnUrl);
    res.json(
        {
            "userId": "20190526A01",
            "userName": "13112344321",
            "registerTime": "2019-05-19 19:24:59",
            "channel": "XXXX渠道",
            "url": "https:www.xxxx.com/xxx/xxx",
            "remark": "XXXXXXXXXXXX"
        }
    );
});

// 提现记录
router.post('/user/listDrawRecords', function(req, res, next) {
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
                "drawId": "0001",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0002",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0003",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "drawId": "0004",
                "drawAmount": "200.00",
                "balance": "200.00",
                "alipayCode": "XXXXXXX@qq.com",
                "name": "张云飞",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});

// 收入记录
router.post('/user/listIncomeRecords', function(req, res, next) {
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
                "id": "0001",
                "incomeAmount": "200.00",
                "incomeType": "任务佣金",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0002",
                "incomeAmount": "100.00",
                "incomeType": "一级队员任务分佣",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0003",
                "incomeAmount": "98.00",
                "incomeType": "级队员任务分佣",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            },{
                "id": "0004",
                "incomeAmount": "72.00",
                "incomeType": "任务佣金",
                "jobName": "XX拉新任务",
                "teamMemberId": "13112345678",
                "state": " 已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});

// 一级团队
router.post('/user/listTeam1', function(req, res, next) {
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
                "teamId": "0001",
                "userId": "2019053A01",
                "username": "13112345678"
            },{
                "teamId": "0002",
                "userId": "2019053A02",
                "username": "13112345678"
            },{
                "teamId": "0003",
                "userId": "2019053A03",
                "username": "13112345678"
            },{
                "teamId": "0004",
                "userId": "2019053A04",
                "username": "13112345678"
            }
        ]
        
    );
});

// 二级团队
router.post('/user/listTeam2', function(req, res, next) {
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
                "teamId": "0001",
                "userId": "2019053A01",
                "username": "13112345678"
            },{
                "teamId": "0002",
                "userId": "2019053A02",
                "username": "13112345678"
            },{
                "teamId": "0003",
                "userId": "2019053A03",
                "username": "13112345678"
            },{
                "teamId": "0004",
                "userId": "2019053A04",
                "username": "13112345678"
            }
        ]
        
    );
});

// 任务信息
router.post('/user/listJobs', function(req, res, next) {
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
                "jobListId": "0001",
                "jobId": "0001",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0002",
                "jobId": "0002",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0003",
                "jobId": "0003",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            },{
                "jobListId": "0004",
                "jobId": "0004",
                "jobname": "亦跑新增注册人员",
                "commission": "100",
                "state": "已通过",
                "time": "2016-09-05 15:00"
            }
        ]
        
    );
});
module.exports = router;