
module.exports = function(app){
    console.log('--- Index.js loaded successful ---');

    function myCustomStack(req, res, next){
        console.log(req.headers['user-agent']);
        next();
    };

    function errorHandler(err, req, res, next){
        console.error(err);
        res.status(500).send(err);
    };



    app.get('/',function(req, res, next){
        res.status(200).send({success: "root folder"});
    });
    app.get('/test', myCustomStack, function(req, res, next){
        res.status(200).send({success: "root folder"});
    });

    app.use(errorHandler);
}

