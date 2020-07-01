var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');

var app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/chats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('successfully connected db')
}).catch((err) => {
  console.error(err);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', chatRouter);

module.exports = app;
