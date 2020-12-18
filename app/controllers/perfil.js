module.exports.perfil = function(app, req, res){
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
		dbo.collection('postagem').find({usuario_postagem: req.session._id}).sort({data_postagem: -1}).toArray(function(err, dados_postagens){
			var ObjectID = require('mongodb').ObjectID;
			var o_id = ObjectID(req.session._id);
			dbo.collection('usuario').find({_id: o_id}).toArray(function(err, dados_usuario){
				res.render('perfil', {postagens: dados_postagens, usuario: dados_usuario});
			});
		});
	});
}

module.exports.form_editar = function(app, req, res){
	var MongoClient = require('mongodb').MongoClient;
	var url = app.config.dbConnection();

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");

		var ObjectID = require('mongodb').ObjectID;
		var o_id = ObjectID(req.body._id);

		dbo.collection('usuario').find({ _id: o_id}).toArray(function(err, dados_usuario){
			res.render('form_editar', {usuario: dados_usuario});
		});
	});
}

module.exports.editar = function(app, req, res){
	var MongoClient = require('mongodb').MongoClient;
	var url = app.config.dbConnection();

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");
		var collection = dbo.collection('usuario');

		collection.find().toArray(function(err, result) {
			if (err) {
				throw err;
			}
			var ObjectID = require('mongodb').ObjectID;
			var o_id = ObjectID(req.body._id);

			if(req.files != null) {
				var file = req.files.foto_usuario;
				var img_name = file.name;
				var endereco_foto = '/uploads/'+img_name;
				file.mv('app/public/uploads/'+file.name, function(err) {
					collection.updateOne(
						{_id: o_id},
						{$set: {
							nome_usuario: req.body.nome_usuario,
							email_usuario: req.body.email_usuario,
							senha_usuario: req.body.senha_usuario,
							foto_usuario: endereco_foto
						}
						}, function(err, result) {
							if (err) {throw err;}
							console.log('Documento atualizado');
						});
					});
			} else {
				collection.updateOne(
					{_id: o_id},
					{$set: {
						nome_usuario: req.body.nome_usuario,
						email_usuario: req.body.email_usuario,
						senha_usuario: req.body.senha_usuario
					}
					}, function(err, result) {
						if (err) {throw err;}
						console.log('Documento atualizado');
					});
			}
			res.redirect('/perfil');
		});
	});
}