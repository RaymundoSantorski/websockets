const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const body_parser = require('body-parser');

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

router.post('/login', (req, res)=>{
    const username = req.body.username;
    req.session.username = username;
    res.redirect('/')
});

module.exports = router;