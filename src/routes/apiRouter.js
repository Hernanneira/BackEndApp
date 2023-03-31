const { Router } = require("express");
const router = Router();
const {controllerCreateCart, controllerGetAPICart,controllerDeleteAPICart } = require('../controllers/controllerCartProducts')

router.post("/", controllerCreateCart);
router.get("/", controllerGetAPICart)
router.delete("/", controllerDeleteAPICart)

module.exports = router;
