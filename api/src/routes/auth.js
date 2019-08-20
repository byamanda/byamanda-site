import { Router } from "express"
import passport from "passport"
import * as jwt from "jsonwebtoken"

let router = Router()

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    let { user } = req

    const token = jwt.sign(
      { id: user.id },
      process.env.API_JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ token })
  }
)

router.get(
  "/verifyToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Looks like your token is good to go!",
    })
  }
)

export default router
