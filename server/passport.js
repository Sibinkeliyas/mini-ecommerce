const GoogleStratergy = require('passport-google-oauth20').Strategy;
const  passport = require('passport')



passport.use(new GoogleStrategy({
    clientID: process.env.clientID ,
    clientSecret:process.env.clientSecret ,
    callbackURL: "http://localhost:3001/auth/google/callback" ,
     scope:['profile' , 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    cb(null , profile)
  }
));

passport.serializeUser((user , done) => {
    done(null , user)
})
passport.deserializeUser((user , done) => {
    done(null , user)
})