/**
 * Module dependencies.
 */

var express = require('express');
var blog = require('./routes/blog');

var app = express();

/**
 * Configuration
 */

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/**
 * Routes
 */

// hello-world home page
app.get('/', blog.home);

// display all posts
app.get('/posts', blog.posts);

// show individual post
app.get('/post/:parmalink', blog.post);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);