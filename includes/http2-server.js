
var fs = require('fs');
var options = {
    key: fs.readFileSync('./example.com.key'),
    cert: fs.readFileSync('./example.com.crt')
};