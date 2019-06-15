import reqwest from 'reqwest';

module.exports = {
  fetch(url, method, params, callback) {
    let api = this.getPath();
    reqwest({
      url: api+url,
      method: method,
      data: params,
      type: 'json',
      success: (result) => {
        console.log("---------------------");
        console.log(result)
        callback(result);
      },
      error: (err) => {
        console.log(err);
        callback({result:'1',msg:err});
      }
    });
  },
  getPath(){
    // return '';
      // return 'http://localhost:8080';
    return 'http://47.96.117.246/swagger-ui.html?from=singlemessage#'
  }
}
