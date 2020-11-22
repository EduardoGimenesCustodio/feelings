module.exports = function(app){
    app.post('/postar',function(req,res){
        app.app.controllers.postagem.postar(app, req, res);
    });

    app.post('/apagar_post',function(req,res){
        app.app.controllers.postagem.apagar_post(app, req, res);
    });
}