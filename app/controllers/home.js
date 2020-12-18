module.exports.index = function(app, req, res){
	if (!req.session.loggedin) {
		res.redirect('/form_login');
		return;
	}

	var MongoClient = require('mongodb').MongoClient;
	var url = app.config.dbConnection();

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");
		dbo.collection('postagem').find().sort({data_postagem: -1}).toArray(function(err, dados_postagens){
			dbo.collection('usuario').find().toArray(function(err, dados_usuarios){
				res.render('index', {postagens: dados_postagens, usuarios: dados_usuarios, id_usuario: req.session._id});
			});
		});
	});
}