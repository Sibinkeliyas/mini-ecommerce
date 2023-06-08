const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')
const cookiesession = require('cookie-session')
// const passportSetup = require('./passport')
const auth = require('./routes/auth')
const uuid = require('uuid')
const GoogleStratergy = require('passport-google-oauth20').Strategy;
const session = require('express-session')


app.use(session({ secret: uuid.v4(), resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// routes
const user = require('./routes/user')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))


passport.use(new GoogleStratergy({
  clientID: process.env.clientID,
  clientSecret:process.env.clientSecret,
  callbackURL: 'http://localhost:3001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// mongoose
mongoose.connect(process.env.Mongo_URL , {})

app.use('/' , user)
app.use('/auth' , auth)


let PORT = process.env.PORT || 3001
app.listen(PORT , () => {
    console.log("Server is running");
})


