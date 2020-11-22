module.exports = function(app){
    app.get('/form_login',function(req,res){
        app.app.controllers.login.form_login(app, req, res);
    });

    app.post('/login',function(req,res){
        app.app.controllers.login.login(app, req, res);
    });

    app.get('/logout',function(req,res){
        app.app.controllers.login.logout(app, req, res);
    });
}