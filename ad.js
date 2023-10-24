const express = require('express');
const app = express();
const port = 8001;
var path = require('path');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
//set cookie as number of hits
var hits = 0;

app.get('/', (req, res) => res.send('Hello World!'))

//on getting a GET request, a cookie will be set if it does not exist yet, otherwise it will be logged
app.get('/banner', function (req, res) {
    hits++;
    // res.cookie("third-party", hits.toString(), { maxAge: 9999999 });
    if (!req.cookies['ad-site-cookie']) {

        var cookievalue = req.query.location ? req.query.location : "default";
        res.setHeader('Set-Cookie', 'ad-site-cookie=' + cookievalue + '; SameSite=None; Secure; Path=/; Partitioned;');

        if (req.query.location == 'default') {
            res.sendFile(path.join(__dirname + "/default.png"))
        } else {
            res.sendFile(path.join(__dirname + "/sponser.png"));
        }
        // res.cookie("third-party", hits.toString(), { maxAge: 9999999, httpOnly: true , sameSite:'none', secure:true});
    }
    else {
        
        // if (!req.query.location) {
        //     res.sendFile(path.join(__dirname + "/products.webp"));
        // }
        if (req.query.location != 'default') {
            var cookievalue = req.query.location ? req.query.location : "default";
            res.setHeader('Set-Cookie', 'ad-site-cookie=' + cookievalue + '; SameSite=None; Secure; Path=/;');
        }
        if (req.cookies['ad-site-cookie'] == 'default') {
            res.sendFile(path.join(__dirname + "/default.png"))
        } else {
            res.sendFile(path.join(__dirname + "/sponser.png"));
        }

        // res.sendFile(path.join(__dirname + "/sponser.png"));
        console.log(req.cookies);
    }

    // if (req.query.location) {
    //     res.sendFile(path.join(__dirname + "/sponser.png"));
    // } else {
    //     res.sendFile(path.join(__dirname + "/sponser.png"));
    // }
    // if (req.query.location === 'home') {

    //     res.sendFile(path.join(__dirname + "/home.avif"));
    // } else if (req.query.location === 'product1') {

    //     res.sendFile(path.join(__dirname + "/product1.webp"));
    // } else if (req.query.location === 'product2') {

    //     res.sendFile(path.join(__dirname + "/product2.avif"));
    // } else if (req.query.location === 'product3') {

    //     res.sendFile(path.join(__dirname + "/product3.webp"));
    // }
    // else if (req.query.location === 'office') {
    //     res.sendFile(path.join(__dirname + "/office.webp"));
    // } 
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
