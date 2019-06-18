import React , { Component } from 'react'

module.exports = {
  getBreadcrumbUrl() {
    const breadcrumbUrl = [
      {
          "key": "user",
          "path": "/user",
          "name": "用户管理",
          "catalog": "0",
          "params": []
      }, {
          "key": "list",
          "path": "/user/list",
          "name": "用户列表",
          "catalog": "1",
          "params": []
        }, {
          "key": "detail",
          "path": "/user/list/detail",
          "name": "用户详情",
          "catalog": "2",
          "params": []
      }, {
          "key": "job",
          "path": "/job",
          "name": "任务来源渠道管理",
          "catalog": "0",
          "params": []
      }, {
          "key": "channel",
          "path": "/job/channel",
          "name": "渠道管理",
          "catalog": "1",
          "params": []
      }, {
        "key": "basicinfo",
        "path": "/job/list/basicinfo",
        "name": "基本信息",
        "catalog": "2",
        "params": []
      }
    ]
    return breadcrumbUrl;
  }
}
