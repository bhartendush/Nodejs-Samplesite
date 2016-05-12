var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/thelist', function(req, res){
	MongoClient = mongodb.MongoClient;

	var url = "mongodb://localhost:27017/samplesite";

	MongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to database');
		}else{
			var collection = db.collection('students');

			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}else if(result.length){
					res.render('studentlist', {
						'studentlist': result
					});
				}
			});
		}
	});
});

router.get('/newstudent', function(req, res){
	res.render('newstudent', {title:'Add Student'});
});


router.post('/addstudent', function(req, res){
	var MongoClient = mongodb.MongoClient;

	var url = "mongodb://localhost:27017/samplesite";

	MongoClient.connect(url, function(err, db){
		if(err){
			res.send('Undable to connect to database');
		}else{
			var collection = db.collection('students');

			var Student1 = {student: req.body.student, street: req.body.street, city: req.body.city, state: req.body.state, sex: req.body.sex, gpa: req.body.gpa};

			collection.insert([Student1], function(err, result){
				if(err){
					console.log(err);
				}else{
					res.redirect("thelist");
				}
			})
		}
	})
})

module.exports = router;
