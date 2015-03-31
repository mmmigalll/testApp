var express = require('express');

var customRouter = function (PG) {

    var User = PG.Model.extend({
        tableName: 'users'
    });

    var userRouter = express.Router();

    var UserCollection = PG.Collection.extend({
        model: User
    });

    userRouter.get('/', function (req, res, next) {
        UserCollection
            .forge()
            /*.query(function(qb){
                qb.where({user_name: 'vashkeba'});
            })*/
            .query("where", {user_name: "pupkin2"})
            .fetch()
            .then(
            function(_user){
                res.status(200).send(_user);
            })
            .otherwise(next);
        //res.status(200).send({success: "user get"});
    });

    userRouter.get('/:userId', function (req, res, next) {
        var userId = req.params.userId;
        User
            .forge({id: userId})
            /*.query(function(qb){
             qb.where({user_name: 'vashkeba'});
             })*/
            .fetch()
            .then(
            function(_user){
                res.status(200).send(_user);
            })
            .otherwise(next);
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

    userRouter.put('/:userId', function (req, res, next) {
        var data = req.body;
        var userId = req.params.userId;
        var user = new User({id: userId});


        user
            .save(data, {patch: true})
            .then(function (_user) {
                res.status(200).send(_user);
            })
            .otherwise(function (err) {
                res.status(500).send(err);
            });
    });

    userRouter.delete('/:userId', function (req, res, next) {

        var userId = req.params.userId;
        var user = new User({id: userId});


        user
            .destroy()
            .then(function (_user) {
                res.status(200).send("User is deleted successfully");
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