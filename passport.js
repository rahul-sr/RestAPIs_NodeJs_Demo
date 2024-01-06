const { users } = require("./data");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = "secretkey";

function passportMiddleware(passport) {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      let user = users.find((user) => user.username === jwt_payload.username);
      console.log("In passport middleware", user);
      return done(null, user);
    })
  );
}

module.exports = passportMiddleware;
