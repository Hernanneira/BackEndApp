const { Router } = require("express");
const router = Router();
const {controllerCreateCart, controllerGetAPICart,controllerDeleteAPICart,controllerUpdateCart } = require('../controllers/controllerCartProducts')

router.post("/", controllerCreateCart);
router.put("/", controllerUpdateCart);
router.get("/", controllerGetAPICart)
router.delete("/", controllerDeleteAPICart)

module.exports = router;
