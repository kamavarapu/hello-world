/**
 * Module dependencies.
 */
var mongodb = require('mongodb');

/**
 * Configuration
 */

var server = new mongodb.Server("127.0.0.1", 27017, {auto_reconnect: true});
var db = new mongodb.Db('blog', server, {safe: true});

/**
 * Handlers
 */

// handler for homepage
exports.home = function(req, res) {
	res.send('hello world');
};

// handler for displaying all posts
exports.posts = function(req, res) {
	db.open(function(err, db_p) {
		var result = [];
		var posts = db.collection('posts');
		
		posts.find().each(function(err, doc) {
			if(err) {
				res.send('Oops: ' + err);
			}
			if(!doc) {
				res.send(result);
				return;
			}
			result.push(doc);
		});

		db.close();		
	});
};

// handler for displaying individual posts
exports.post = function(req, res) {
	db.open(function(err, db_p) {
		var posts = db.collection('posts');
		var permalink = req.params.parmalink;

		posts.findOne({'permalink': permalink}, function(err, doc) {
			if(err) {
				res.send('Oops: ' + err);
			}
			res.send(doc);
		});

		db.close();	
	});
};