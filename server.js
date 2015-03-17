var express = require('express');
var app = express();
var loger = require('morgan');

/*function myCustomStack(req, res, next){
   console.log(req.headers['user-agent']);
   next();
};*/


app.use(loger('dev'));

require('./routers/index')(app);

app.listen(3030, function(){
   console.log('--- Express start successful ---');
});