var express = require('express');

var customRouter = function (PG) {

    var User = PG.Model.extend({
        tableName: 'users'
    });

    var userRouter = express.Router();

    var userCollection = PG.Collection.extend({
        model: User
    });

    userRouter.get('/', function (req, res, next) {
        User.fetchAll().then(
            function(_user){
                res.status(200).send(_user);
            }
        ).otherwise(next);
        //res.status(200).send({success: "user get"});
    });

    userRouter.post('/', function (req, res, next) {
        var data = req.body;

        var user = new User(data);
        user
            .save()
            .then(function (_user) {
                res.status(200).send(_user);
            })
            .otherwise(function (err) {
                res.status(500).send(err);
            });
    });

    return userRouter;
};

/*userRouter.('/', function(req, res, next){

 });*/

module.exports = customRouter;