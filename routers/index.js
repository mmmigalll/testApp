
module.exports = function(app){
    console.log('--- Index.js loaded successful ---');

    var PostGre = app.get('PostGre');

    var userRouter = require('./users')(PostGre);

    app.get('/',function(req, res, next){
        res.status(200).send({success: "root folder"});
    });

    app.use('/user', userRouter);



}

