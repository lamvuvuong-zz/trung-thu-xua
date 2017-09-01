var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/trung-thu-xua';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trung thu xưa' });
});

router.get('/order-data', function(req, res, next) {
	var resultArray = [];
	mongo.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection('order').find();
		cursor.forEach(function(doc, err) {
			assert.equal(null, err);

			var date = new Date(doc['created-date']);

			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			doc['created-date'] =  (new Date(doc['created-date'])).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + day + '/' + month + '/' + year;


			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('order', {title: 'Trung thu xưa', items: resultArray});
		});
	});
})

router.post('/order', function(req, res, next) {

	var item = {
		'full-name': req.body['full-name'],
		'phone-number': req.body['phone-number'],
		'email': req.body['email'],
		'address': req.body['address'],
		'option-1': req.body['option-1'],
		'option-2': req.body['option-2'],
		'option-3': req.body['option-3'],
		'total-price': req.body['option-1'] * 249000 + req.body['option-2'] * 249000 + req.body['option-3'] * 249000,
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
