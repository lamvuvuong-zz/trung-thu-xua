var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/trung-thu-xua';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/order', function(req, res, next) {

	var item = {
		'full-name': req.body['full-name'],
		'phone-number': req.body['phone-number'],
		'email': req.body['email'],
		'address': req.body['address'],
		'option-1': req.body['option-1'],
		'option-2': req.body['option-2'],
		'option-3': req.body['option-3'],
		'created-date': new Date()

	}
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);

		db.collection('order').insertOne(item, function(err, result) {
			assert.equal(null, err);

			db.close();
			var response = {
				status  : 200,
				success : 'Inserted Successfully'
			}

			res.end(JSON.stringify(response));
		});
	})
});


module.exports = router;
