module.exports = function(app){
    app.get('/form_cadastro',function(req,res){
		app.app.controllers.cadastro.form_cadastro(app, req, res);
	});

	app.post('/cadastrar_usuario',function(req,res){
		app.app.controllers.cadastro.cadastrar_usuario(app, req, res);
	});
}