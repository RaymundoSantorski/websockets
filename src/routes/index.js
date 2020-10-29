const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const body_parser = require('body-parser');

//firebase
const admin = require('firebase-admin');
var serviceAccount = require('/home/raymundo/nodepro/nodesocketpro/websocketchat-e51b2-firebase-adminsdk-sznst-807325dfdb.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://websocketchat-e51b2.firebaseio.com/'
});
const db = admin.database();

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
        res.redirect('login');
    }
});

router.get('/logout', (req, res)=>{
    req.session.username = null;
    res.redirect('/');
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    var user = false;
    db.ref('users').once('value', (snapshot)=>{
        const data = snapshot.val();
        for(key in data){
            if(data[key]['username']==username){
                if(data[key]['password']==password){
                    user = true;
                }
            }
        }
    });
    if(user){
        console.log({password: password, username: username});
        req.session.username = username;
        res.redirect('/');
    }else{
        console.log('No');
        res.redirect('/');
    }
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.post('/signup', async (req, res)=>{
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    }
    await db.ref('users').push(newUser);
    req.session.username = newUser['username'];
    res.redirect('/',{newUser});
});

module.exports = router;