const express = require('express')
const mongoose = require('mongoose')
//var passWordJSON = require('./password.json');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path= require('path')
const app = express()

const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const port = process.env.PORT || 3000

const whitelist = ['https://ltps80-prf2021.web.app', 
'https://ltps80-prf2021.firebaseapp.com', 
'http://localhost:4200','http://localhost:3000','http://localhost:'+port,'https://ltps80-prf2021.herokuapp.com'];

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'+origin))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));

const dbUrl= 'mongodb+srv://'+ process.env.MONGO+'@cluster0.6o0hj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const dbUrl = 'mongodb://localhost:27017'
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => { console.log('db connected') })
mongoose.connection.on('error', (err) => { console.log('db error', err) })

mongoose.model('aru', require('./models/arukereso.schema'))
mongoose.model('user', require('./models/user.schema'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
//definiáljuk a lokális stratégiát
passport.use('local', new localStrategy(function (username, password, done) {
    const userModel = mongoose.model('user')
    //a passport hacsak nem rendelkezünk másképp, a req.body.username és a req.body.password mezőket keresi majd
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));

/* Ezek a következőt csinálják: ha megadjuk őket, akkor a req.logIn művelet során sessionbe,
munkafolyamatba léptetik a usert - a kliens kap egy sütit, ami ha a későbbi kéréseiben visszjön,
a passport egyből felismeri, hogy már bejelentkezett egyszer, illetve a req.user mezőn keresztül
el tudjuk majd érni azt az adatot, amit a serialize-nál a done() második paramétereként adtunk meg */
passport.serializeUser(function (user, done) {
    if (!user) return done('nincs megadva beléptethető felhasználó', null);
    return done(null, user);
});
passport.deserializeUser(function (user, done) {
    if (!user) return done("nincs user akit kiléptethetnénk", null);
    return done(null, user);
});
//ezzel a secrettel lesznek aláírva, hitelesítve a sütik, érdemes minél komplexebbet választani - vagyis nem ilyet, mint most én
app.use(session({ secret: process.env.SESSIONPASSWORD, resave: false }));
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname,'public')))
.set('views',path.join(__dirname,'view'))
.set('view engine','ejs')
.get('/',(req,res)=>res.render('pages/index'))

app.use('/', require('./routes'))
app.use('/subrouter-pelda', require('./routes'))

app.listen(port, () => {
    console.log('A szerver elindult')
})