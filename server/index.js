const app = require('express')(),
  massive = require('massive'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  Auth0Strategy = require('passport-auth0'),
  cors = require('cors'),
  port = 3030;

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log(`Ship Docked at port: ${port}`);
  });
});

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALL_BACK_URL,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      // app.get('db').doesUserExist([profile.id]).then((user) => {
      //   if(user[0]) {
      //     done(null, user[0].id);
      //   } else {
      //     app.get('db').createUser([profile.displayName]);
      //   }
      done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserialize');
  done(null, user);
});

app.get('/auth', passport.authenticate('auth0'));

app.get(
  '/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/user',
    failureRedirect: '/auth',
  })
);

app.get('/auth/user', (req, res) => {
  console.log('user');
  res.send(req.user);
});

app.get('/auth/logout', (req, res) => {
  console.log('logout');
  req.logOut();
  res.redirect('http://localhost:3000/#/');
});
