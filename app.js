var express = require('express');
var app = express();
var fs = require('fs');

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
		url: "http://192.168.1.56:3000/" + req.params.page_name
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

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});