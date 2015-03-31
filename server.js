var express = require('express');
var app = express();
var loger = require('morgan');
var bodyParser = require('body-parser')

require('./config/dev.js');

/*else{
   require('./config/prod.js');
}*/
var knex = require('knex')({
   debug: true,
   client: 'pg',
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
      //charset: 'utf8'
   }
});

var PostGre = require('bookshelf')(knex);
app.set('PostGre', PostGre);

app.use(loger('dev'));

app.use(bodyParser.json({strict: false, limit: 1024 * 1024 * 200}));
app.use(bodyParser.urlencoded({extended: false}));

require('./routers/index.js')(app);

app.listen(3030, function(){
   console.log('--- Express start successful ---');
});