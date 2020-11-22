module.exports.postar = function(app, req, res){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");

		if(req.files != null) {
			var file = req.files.foto_postagem;
			var img_name = file.name;
			var endereco_foto = '/uploads/'+img_name;
			file.mv('app/public/uploads/'+file.name, function(err) {
				dbo.collection('postagem').save(
				{
					texto_postagem: req.body.texto_postagem,
					usuario_postagem: req.body.usuario_postagem,
					data_postagem: Date(),
					foto_postagem: endereco_foto
				}, function(err, result) {
					if (err) {throw err;}
				});
			});
		} else {
			dbo.collection('postagem').save(
			{
				texto_postagem: req.body.texto_postagem,
				usuario_postagem: req.body.usuario_postagem,
				data_postagem: Date()
			}, function(err, result) {
				if (err) {throw err;}
			});
		}
		res.redirect('/');
	});
}

module.exports.apagar_post = function(app, req, res){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, {useNewUrlParser: true },
	function(err, db) {
		if (err) {throw err;}
		var dbo = db.db("feelings");
		var collection = dbo.collection('postagem');
		collection.find().toArray(function(err, result) {
			if (err) {
				throw err;
			}
			var find = req.body.id_postagem; // recebe o id do cliente que o usuário pretende excluir
			var ObjectID = require('mongodb').ObjectID;
			var o_id = ObjectID(find);
			collection.deleteOne( // aciona o método de exclusão de um registro da coleção
				{_id: o_id}, function(err, result) { // procura no banco um id igual ao do cliente que será excluído
					if (err) {
						throw err;
					}
				});
			console.log('Documento apagado');
			res.redirect('/perfil');
		});
	});
}