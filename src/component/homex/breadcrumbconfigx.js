import React , { Component } from 'react'

// class breadcrumbconfig {
//   getBreadcrumbUrl() {
//     const breadcrumbUrl = [
//       {
//           "key": "home",
//           "path": "/home",
//           "name": "任务来源渠道管理",
//           "catalog": "0",
//           "params": []
//       }, {
//           "key": "homelistx",
//           "path": "/home/homelistx",
//           "name": "渠道列表",
//           "catalog": "1",
//           "params": []
//         }, {
//           "key": "basicinfox",
//           "path": "/home/homelist/basicinfox",
//           "name": "渠道详情",
//           "catalog": "2",
//           "params": []
//       }
//     ]
//     return breadcrumbUrl;
//   }
// }

// export default breadcrumbconfig
export const breadcrumbconfig = {
  getBreadcrumbUrl() {
    const breadcrumbUrl = [
      {
          "key": "home",
          "path": "/home",
          "name": "任务来源渠道管理",
          "catalog": "0",
          "params": []
      }, {
          "key": "homelistx",
          "path": "/home/homelistx",
          "name": "渠道列表",
          "catalog": "1",
          "params": []
        }, {
          "key": "basicinfox",
          "path": "/home/homelist/basicinfox",
          "name": "渠道详情",
          "catalog": "2",
          "params": []
      }
    ]
    return breadcrumbUrl;
  }
}
