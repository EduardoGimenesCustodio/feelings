module.exports.form_login = function(app, req, res){
	res.render('form_login', {validacao: {}});
}

module.exports.login = function(app, req, res){
	var email = req.body.email_usuario;
	var senha = req.body.senha_usuario;
	if (email && senha) {
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, {useNewUrlParser: true }, 
		function(err, db) {
			if (err) {throw err;}
			var dbo = db.db("feelings");
			dbo.collection('usuario').find({email_usuario: {$eq: email}}).toArray(function(err, result){
				if(result.length > 0) {
					var usuario = result;
					if(usuario[0].email_usuario === email && usuario[0].senha_usuario === senha) {
						req.session.loggedin = true;
						req.session._id = usuario[0]._id;
						res.redirect('/');
					} else {
						var erro = 'E-mail ou senha incorretos';
						res.render('form_login', {validacao: erro});
						res.end();
					}
				} else {
					var erro = 'E-mail ou senha incorretos';
					res.render('form_login', {validacao: erro});
					res.end();
				}
			});
		});
	} else {
		res.end();
	}
}

module.exports.logout = function(app, req, res){
    req.session.destroy();
    res.redirect('/');
}