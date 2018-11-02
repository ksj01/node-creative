var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        console.log("here");
        res.sendFile('index.html', { root: 'public' });
});

router.get('/calculate', function(req, res, next) {
        var mortgage = req.query.mortgage;
        var rate = req.query.rate;
        var time = req.query.time;
        var down = req.query.down;
        var credit = req.query.credit;
        var interest = (mortgage * (rate / 100)) * time;
        var payoff = parseInt(interest) + parseInt(mortgage);
        var downpercent = (down / mortgage) * 100;
        var payment = payoff / (time * 12);
        

        var o = [];
        
        var data = {
                payoff: payoff.toFixed(2),
                downpercent: downpercent.toFixed(2),
                payment: payment.toFixed(2)
        };
        o.push(data);

        res.status(200).json(o);
});

router.get('/afford', function(req, res, next) {
        var income = req.query.income;
        var payment = req.query.payment;

        var percentage = payment / income;
        console.log(percentage);
        console.log(payment);
        console.log(income);
        var shouldYou = percentage > 0.3 ? "No" : "Yes";

        var jsonresult = [];
        jsonresult.push({ shouldYou: shouldYou });

        res.status(200).json(jsonresult);
});

module.exports = router;
