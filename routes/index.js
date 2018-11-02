var express = require('express');
var fs = require('fs');
var request = require('request')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.sendFile('index.html', { root: 'public' });
});

router.get('/mansion', function(req, res, next) {
        console.log("here");
        res.sendFile('mansion.jpg', { root: 'public' });
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
        var credit = req.query.credit;

        var percentage = payment / income;
        var actual = (percentage * 100).toFixed(2);
        var shouldYou;
        if (percentage > 0.3) {
                shouldYou = "You can't afford this house. You want your mortgage to be no more than 30% of your income. Your mortgage would be " + actual + "%."; 
        }
        else if (credit < 660 && credit > 580 && percentage < 0.3) {
                shouldYou = "You can, but you shouldn't. Try to get your credit score above 660 if possible."
        }
        else if (credit < 580) {
                shouldYou = "You make enough, but you can't buy a house. You need to work on your credit. The minimum to buy a house is 580.";
        }
        else {
                shouldYou = "Yes, you can! Go crazy!";
        }

        var jsonresult = [];
        jsonresult.push({ shouldYou: shouldYou });

        res.status(200).json(jsonresult);
});

module.exports = router;
