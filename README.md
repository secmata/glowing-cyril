##1 INSTALL NODE
https://nodejs.org/
##2 INSTALL EXPRESS 
http://expressjs.com/starter/installing.html
* npm init
* npm install express --save
* express . --hbs 
* npm install

######//remove favicon
* npm rm serve-favicon --save
```
>app.js
//var favicon = require('serve-favicon');
```
######//run application to test if no error
* node app.js
* DEBUG=test:* ./bin/www
* DEBUG=test /bin/www
* npm start

##3 INSTALL ANGULARJS

######//create file .bowerrc
```
{
  "directory": "public/bower"
}
```
* npm install bower -g
* bower install angular
* bower install angular-route

```
>view>index.hbs

<div ng-app="myApp">
	<div ng-controller="AppCtrl">
		<input ng-model="test">
		{[{test}]}
	</div>
</div>
<script src="/bower/angular/angular.min.js"></script>
<script src="/bower/angular-route/angular-route.min.js"></script>
<script src="/javascripts/test/test.js"></script>
```

```
>public>javascripts>test>test.js

(function(){
	angular.module('myApp', [])
        .config(function($interpolateProvider) {
          $interpolateProvider.startSymbol('{[{');
          $interpolateProvider.endSymbol('}]}');
        })
    	.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
            $scope.test = 'sample';
        }]);
})();
```
##4 INSTALL BOOTSTRAP
* bower install bootstrap

```
>view>layout.js

<link rel='stylesheet' href='/bower/bootstrap/dist/css/bootstrap.min.css' />
<link rel='stylesheet' href='/bower/bootstrap/dist/css/bootstrap-theme.min.css' />
```
##5 INSTALL MONGODB
######//download mongdb
https://www.mongodb.org/downloads
######//run mongodb
* cd D:\mongo\bin
* mongod

######//modify mongodb
* cd D:\mongo\bin
* mongo

######//show all db
* show dbs

######//switch db
* use test

######//insert data
* db.test.insert({name: 'Tom', email: 'tom@testemail.com', number: '(444)444-4444'})
* db.test.find().pretty()


##6 ROUTING
```
>app.js

var test = require('./routes/test');
app.use('/test', test);
```

```
>routes>test.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

module.exports = router;
```
##7TEST ANGULARJS CONNECTION IN NODE.JS ROUTE
```
>public>javascripts>test>test.js

.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/test').success(function(response){
        	console.log('success request');
        });
}]);
```

```
>routes>test.js

router.get('/', function(req, res, next) {
  	console.log('get request');
});
```
##8 CONNECT NODE.JS IN MONGODB USING MONGOJS
* npm install mongojs
```
>routes>test.js

var mongojs = require('mongojs');
var db = mongojs('test', ['test']);

/* GET users listing. */
router.get('/', function(req, res, next) {

	db.test.find(function (err, docs) {
        	console.log(docs);
        	res.json(docs);
    	});	
});

```
######//ANGULARJS GET DATA FROM NODE
```
>public>javascripts>test>test.js

.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
            $http.get('/test').success(function(response){
            	console.log('success request');
            	console.log(response);
            });
}]);
```
###9 CREATE LAYOUT
```
<div ng-app="myApp">
	<div class="container" ng-controller="AppCtrl">
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Number</th>
					<th>Action</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input class="form-control" ng-model="testdata.name"></td>
					<td><input class="form-control" ng-model="testdata.email"></td>
					<td><input class="form-control" ng-model="testdata.number"></td>
					<td><button class="btn btn-primary" ng-click="addContact()">Add Contact</button></td>
					<td><button class="btn btn-info" ng-click="update()">Update</button>&nbsp;&nbsp;<button class="btn btn-info" ng-click="deselect()">Clear</button></td>
				</tr>
				<tr ng-repeat="data in test">
					<td>{[{data.name}]}</td>
					<td>{[{data.email}]}</td>
					<td>{[{data.number}]}</td>
					<td><button class="btn btn-danger" ng-click="remove(data._id)">Remove</button></td>
					<td><button class="btn btn-warning" ng-click="edit(data._id)">Edit</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

##10 VIEW, ADD, EDIT, UPDATE, DELETE
* npm install body-parser
```
var bodyParser = require('body-parser');

app.user(bodyParser.json());

>public>javascripts>test>test.js
var refresh = function(){
	$http.get('/test').success(function(response){
		console.log('success request');
		console.log(response);
		$scope.test = response;
		$scope.testdata = '';
	});
}

refresh();

$scope.addContact = function() {
	console.log($scope.testdata);
	$http.post('/test', $scope.testdata).success(function(response) {
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/test/' + id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/test/' + id).success(function(response){
		$scope.testdata = response;
	});
}

$scope.update = function() {
	console.log($scope.testdata._id);
	$http.put('/test/' + $scope.testdata._id, $scope.testdata).success(function(response){
		refresh();
	});
};

$scope.deselect = function() {
	$scope.testdata = "";
}
```
```
>routes>test.js

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
```
