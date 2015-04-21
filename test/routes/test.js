var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('test', ['test']);
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.test.find(function (err, docs) {
    	console.log(docs);
    	res.json(docs);
    }); 
});

router.post('/', function(req, res){
    console.log(req.body);
    db.test.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.test.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    })
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.test.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    });
});

router.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.test.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc){
            res.json(doc);
        });
});

module.exports = router;