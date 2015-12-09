var express = require('express');
var app = express();
var swig = require('swig');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views'); // where to find views
app.set('view engine', 'html'); // what file extension they have
app.engine('html', swig.renderFile); // how to render html

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve any other static files
app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next){
	console.log("in here");
	console.log(req.method + ' / ' +res.statusCode);
	next();
})
app.use(function(req,res){
	
	res.render('index');
})

//handle errors
app.use(function(err,req,res,next){
	res.status(err.status || 500)
	console.log({error: err});
	res.render('error', {
		error: err
	});
});

app.listen(8888, function(){
	console.log("Listening on port 8888")
})