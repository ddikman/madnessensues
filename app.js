var express = require('express');
var log = require("npmlog");
var app = express();
var fs = require('fs');
var config = require("./config");

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render("index");
});

var pageExists = function(name){
	return fs.existsSync(__dirname + "/views/" + name + ".jade")
};

app.get('/api/page/:page_name', function(req, res){

	var success = pageExists(req.params.page_name);

	res.json({
		success: success,
		url: req.protocol + "://" + req.get("host") + "/" + req.params.page_name
	});

});

app.get('/:page_name', function(req, res, next){

	if(pageExists(req.params.page_name))
		res.render(req.params.page_name);
	else
		next();
});

app.get('/*', function(req, res, next){
	res.render("invalid");
});

var port = process.env.PORT || config.port;
var server = app.listen(port, function () {

  log.info('general', 'Server started at port %s', port);

});