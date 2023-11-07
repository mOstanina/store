const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authorizationMiddleWare = require("../middleWare/authorizationMiddleWare")

router.post("/registration", userController.registration)
router.post("/login",userController.login)
router.get("/auth", authorizationMiddleWare, userController.check)

module.exports = router