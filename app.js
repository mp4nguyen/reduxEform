var express = require('express');
var path = require("path");
var https = require('https');
var http = require('http');
var fs = require('fs');

var app = express();

var ssl_options = {
        key: fs.readFileSync('key/star_redimed_com_au.key'),
        cert: fs.readFileSync('key/star_redimed_com_au.pem')
};

// app.use('/metronic', express.static(__dirname + '/metronic'));
// app.use('*', express.static('public'));
// app.listen(process.env.PORT || 3014);



// Serve up content from public directory
app.use(express.static(__dirname + '/public'));
app.use('/metronic',express.static(path.join(__dirname,"./metronic")));


app.listen(7777,function(){
    console.log("Started listening on port: ", 7777);
})

// var favicon = require('serve-favicon');
// app.use(favicon(__dirname + '/client/favicon.ico'));

// app.get('/', function(req, res){
// 	res.render('index.ejs', {appconfig: appconfig});
// });

//
// console.log("============================== production");
// https.createServer(ssl_options, app).listen('3014', function() {
//     console.log('Express server listening on port https 3014');
// });
