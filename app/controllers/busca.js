module.exports.busca = function(app, req, res){
    res.render('busca', {usuarios: {}});
}

module.exports.pesquisar = function(app, req, res){
    if (!req.session.loggedin) {
		res.redirect('/form_login');
		return;
	}

	var MongoClient = require('mongodb').MongoClient;
	var url = app.config.dbConnection();
    
    var nome_usuario = req.body.nome_usuario;

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");
		
		dbo.collection('usuario').find({nome_usuario: nome_usuario}).toArray(function(err, dados_usuarios){
			res.render('busca', {usuarios: dados_usuarios});
		});
	});
}