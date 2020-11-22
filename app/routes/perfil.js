module.exports = function(app){
	app.get('/perfil',function(req,res){
        app.app.controllers.perfil.perfil(app, req, res);
    });

	app.post('/form_editar',function(req,res){
		app.app.controllers.perfil.form_editar(app, req, res);
	});

	app.post('/editar',function(req,res){
		app.app.controllers.perfil.editar(app, req, res);
	});
}