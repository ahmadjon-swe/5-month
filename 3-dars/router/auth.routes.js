const {Router} = require("express")
const { register, verify, login, verifyAndDelete, logout } = require("../controller/auth.controller")
const authorization = require("../middleware/authorization")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.post("/delete_account", login)
authRouter.post("/delete_verify", verifyAndDelete)
authRouter.get("/logout", authorization, logout)

module.exports = authRouter