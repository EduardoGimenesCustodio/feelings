var express = require('express');
var session = require('express-session');
var consign = require('consign');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var app = express();
app.set('view engine', 'ejs');
app.set('views','./app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));

consign()

	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/controllers')

	.into(app);

module.exports = app;