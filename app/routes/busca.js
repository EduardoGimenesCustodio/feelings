module.exports = function(app){
	app.get('/busca',function(req,res){
		app.app.controllers.busca.busca(app, req, res);
	});

	app.post('/pesquisar',function(req,res){
		app.app.controllers.busca.pesquisar(app, req, res);
	});
}