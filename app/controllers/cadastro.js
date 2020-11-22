module.exports.form_cadastro = function(app, req, res){
	if (req.session.loggedin) {
		res.redirect('/');
		return;
	}

	res.render('form_cadastro');
}

module.exports.cadastrar_usuario = function(app, req, res){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");

		dbo.collection('usuario').save(
		{
			nome_usuario: req.body.nome_usuario,
			email_usuario: req.body.email_usuario,
			senha_usuario: req.body.senha_usuario,
			nascimento_usuario: req.body.nascimento_usuario
		}, function(err, result) {
			if (err) {throw err;}
		});
		app.app.controllers.login.login(app, req, res);
	});
}