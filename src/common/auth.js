import reqwest from 'reqwest';

export const auth = {
  fetch(url, method, params, callback) {
    let api = this.getPath();
    let headers = this.getHeaders(url);
    reqwest({
      url: api + url,
      method: method,
      headers:headers,
      data: params,
      type: 'json',
      success: (result) => {
        // console.log("---------------------");
        // console.log(result);
        callback(result);
      },
      error: (err) => {
        // console.log("+++++++++++++++++++++");
        // console.log(err);
        if (401 == err.status) {
           window.location.href= this.getLoginUrl();
        }
        // console.log(err);
        // callback(err.status);
        callback("error");
        // if (err.status == 767) {
        //   callback(err.status);
        // } else if(err.status == 400) {
        //   callback(err.status);
        // } else if (err.status == 401) {
        //   window.location.href= this.getLoginUrl();
        // } else if (err.status == 403) {
        //   callback(err.status);
        // } else if (err.status == 405) {
        //   callback(err.status);
        // } else if (err.status == 452) {
        //   callback(err.status);
        // } else {
        //   console.log(err);
        //   callback(err);
        // }
       
      }
    });
  },

   // 判断header中是否有token
   getHeaders(url) {
    // 获取验证码接口和获取token接口
    if (url.indexOf("/v1/token") != -1 || "/v1/token" == url) {
      return {};
    } else {
      let headers = {
        "Accept": "*/*",
        "DUOM_HEADER": localStorage.token
      };
      return headers;
      // return {};
    }
  },

  getTimestamp(dateString) {
    return new Date(dateString).getTime()/1000;
  },

  getLoginUrl() {
    return '/lqgc/dm/project';
  },

  getLoginUrlx() {
    return '/bs1010/dm/project';
  },

  getPath(){
    // return '';
      // return 'http://localhost:8080';
    return 'http://47.96.117.246';
    // return 'http://10.131.80.70:8080';
  }

}
