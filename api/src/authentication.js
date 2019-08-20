import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"

import bcrypt from "bcrypt"
import db from "./db"

const init = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = null

        let correctPassword
        if (user) {
          correctPassword = await bcrypt.compare(password, user.password)
        } else {
          return done(null, false)
        }

        if (correctPassword) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.API_JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwt_payload, done) => {
        done(null, jwt_payload)
      }
    )
  )
}

export default init
