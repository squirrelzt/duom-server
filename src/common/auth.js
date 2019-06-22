import reqwest from 'reqwest';

module.exports = {
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
        if (err.status == 767) {
          callback(err.status);
        } else if(err.status == 400) {
          callback(err.status);
        } else if (err.status == 401) {
          window.location.href="/login";
        } else if (err.status == 405) {
          callback(err.status);
        } else {
          console.log(err);
          callback({result:'1',msg:err});
        }
       
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
  getPath(){
    // return '';
      // return 'http://localhost:8080';
    return 'http://47.96.117.246';
    // return 'http://192.168.125.104:8080';
  }
}
