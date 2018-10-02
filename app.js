var express = require('express'),
	app = express(),
	mysql = require('mysql'),
	router = express.Router(),
	bodyParser = require('body-parser');
	
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});

// ROUTING
var mvcViews =  '/views/dist';
var exposeThese = [
	'/node_modules',
	'/resources/image',
	'/resources/style',
	'/resources/script'
];
for (i = 0; i < exposeThese.length; i++){
	app.use(exposeThese[i], express.static(__dirname + exposeThese[i]));
}
var sendTheseFiles = [
	'blog',
	'contact',
	'privacy',
	'projects',
	'resume',
	'testimonials'
];
for (i = 0; i < sendTheseFiles.length; i++){
	setPage(sendTheseFiles[i]);
}
function setPage(lead){
	app.get('/'+lead,function(req,res){
		res.sendFile(lead+'.html',{'root':__dirname + mvcViews})
	});
};
app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + mvcViews});
});
app.get("/blog/*",function(req,res){
	res.sendFile(req.path+'.html',{'root':__dirname + mvcViews});
});
app.get("/projects/*",function(req,res){
	res.sendFile(req.path+'.html',{'root':__dirname + mvcViews});
});