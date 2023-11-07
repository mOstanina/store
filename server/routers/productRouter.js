const Router = require("express")
const router = new Router()
const productController = require("../controllers/productController")
const checkRole = require("../middleWare/checkRoleMiddleWare")

router.post("/", checkRole("ADMIN"), productController.create)
router.get("/", productController.getAll)
router.get("/:id", productController.getProduct)

module.exports = router