var app = require('./config/server');

// localhost

// app.listen(3000,function(){
// 	console.log('Servidor ON');
// });

// umbler

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Servidor ON', port);
});