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
module.exports = router;