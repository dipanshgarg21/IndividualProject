const express = require('express');
const app = express();
const bycrypt = require('bcrypt'); 
const bodyParser = require('body-parser');

const port = 3000;
const base = `${__dirname}/pages`;
const { initializingPassport, protected } = require('./pconfig');
const mongoose = require('mongoose');
const ejs = require('ejs');
const helmet = require('helmet');
const expressSession = require("express-session");
const passport  = require('passport');
const User = require('./credentials');
mongoose.connect('mongodb+srv://dipansh:qwerty99@mydb.chvnp5g.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('pages'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.originAgentCluster());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

initializingPassport(passport);
app.set("view engine","ejs");

app.get('/', function(req, res) {
    res.sendFile(`${base}/main.html`);
});

app.get('/login', function(req, res) {
    res.render(`login`)
})

app.get('/register', function(req, res) {
    res.render(`register`)
})

app.post('/register', async(req, res) => {
    const user = await User.findOne({username:req.body.username});
  
    if(user) return res.status(400).send('<script>alert("User already exists"); window.location.href = "/login";</script>');
  
    const newUser = await User.create(req.body);
    res.redirect('/login');
  })
  
  app.post('/login', passport.authenticate('local', {
    failureFlash: true,failureRedirect: "/register"
  }), function(req, res) {
    res.redirect('/show-devices');
  });

app.get('/add-device', function(req, res) {
    res.sendFile(`${base}/add-device.html`);
});

app.get('/light', function(req, res) {
    res.sendFile(`${base}/light.html`);
});

app.get('/air-conditioning', function(req, res) {
    res.sendFile(`${base}/airConditioning.html`);
});

app.get('/security', function(req, res) {
    res.sendFile(`${base}/security.html`);
});

app.get('/show-devices', protected,function(req, res) {
    res.sendFile(`${base}/show-devices.html`);
});

app.get('/delete-device', function(req, res) {
    res.sendFile(`${base}/delete-device.html`);
});

app.get('/high-chart', function(req, res) {
    res.sendFile(`${base}/highchart.html`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});