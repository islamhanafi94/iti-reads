const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = (passport) => {
    let config = {};
    config.secretOrkey = process.env.secret;
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    passport.use(new jwtStrategy(config, (jwtPayload, done) => {
        try {
            const user = User.findById(jwtPayload._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);

            }
        } catch (error) {
            return done(err, false);

        }
    }));
}