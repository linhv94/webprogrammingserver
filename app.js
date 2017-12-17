var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var db = require('monk')('mongodb://admin:1234@ds159926.mlab.com:59926/webprograming'); //connect to database
var router = express.Router();

//create express app
var app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use middleware and attach data in json to req.body
app.use(function (req, res, next) {
    req.db = {};
    req.db.products = db.collection('products');
    req.db.productTypes = db.collection('productTypes');
    req.db.shoppingCarts = db.collection('shoppingCarts');
    next();
});

//view engine setup
app.set('views', __dirname + '/views');

app.get('/home', function (req, res) {
    res.render('home.ejs');

});

//mount router middleware
app.use('/', router);

router.get('/products', function(req, res) {
    req.db.products.find({}, { "limit": 100 }, function (err, products) {
        res.json(products);
    });
});

router.post('/products', function(req, res) {
    req.db.products.insert(req.body, function (e, products) {
        res.json(products);
    });
});

router.get('/products/:id', function(req, res){
    req.db.products.find({ _id: req.params.id }, function(err, product){
        res.json(product);
    })
});

router.put('/products/:id', function(req, res) {
    req.db.products.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, product){
        res.json(product);
    })
});

router.delete('/products/:id', function(req, res) {
    req.db.products.remove({ _id: req.params.id }, function (e, product) {
        res.json(product);
    })
});



///////////////////////////////////////////////////////////////////
router.get('/productTypes', function(req, res) {
    req.db.productTypes.find({}, { "limit": 100 }, function (err, productTypes) {
        res.json(productTypes);
    });
});

router.post('/productTypes', function(req, res) {
    console.log(req.body);
    req.db.productTypes.insert(req.body, function (e, productTypes) {
        res.json(productTypes);
    });
});

router.get('/productTypes/:id', function(req, res){
    req.db.productTypes.findOne({ _id: req.params.id }, function(err, productType){
        res.json(productType);
    });
});

router.put('/productTypes/:id', function(req, res) {
    req.db.productTypes.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, productType){
        res.json(productType);
    });
});

router.delete('/productTypes/:id', function(req, res) {
    req.db.productTypes.remove({ _id: req.params.id }, function (e, productType) {
        res.json(productType);
    });
});

///////////////////////////////////////////////////////////////////

router.get('/shoppingCarts', function(req, res){
    req.db.shoppingCarts.find({}, { "limit": 100 }, function(err, shoppingCarts){
        res.json(shoppingCarts);
    });
});

router.post('/shoppingCarts', function(req, res){
    req.db.shoppingCarts.insert(req.body, function(err, shoppingCarts){
        res.json(shoppingCarts);
    });
});

router.get('/shoppingCarts/:id', function(req, res){
    req.db.shoppingCarts.findOne({ _id: req.params.id }, function(err, shoppingCart){
        res.json(shoppingCart);
    });
});

router.put('/shoppingCarts/:id', function(req, res){
    req.db.shoppingCarts.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, shoppingCart){
        res.json(shoppingCart);
    });
});

router.delete('/shoppingCarts/:id', function(req, res){
    req.db.shoppingCarts.remove({ _id: req.params.id }, function(err, shoppingCart){
        res.json(shoppingCart);
    });
});


app.listen(app.get('port'), function () {
    console.log('Server is running on port', app.get('port'));
});

module.exports = app;