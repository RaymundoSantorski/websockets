const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const body_parser = require('body-parser');
const firebase = require('firebase/app');

router.use(body_parser.urlencoded({extended:true}));

router.use(cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24*60*60*1000
}));


router.get('/', (req, res)=>{
    if(req.session.username){
        res.render('index', {username: req.session.username});
    }else{
        res.render('login');
    }
});

router.get('/logout', (req, res)=>{
    req.session.username = null;
    res.redirect('/');
});

router.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    req.session.username = username;
    res.redirect('/');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signup', (req, res)=>{
    username = req.body.username;
    password = req.body.password;
    console.log(username, password);
    req.session.username = username;
    res.redirect('/');
});

module.exports = router;