const { Router } = require("express");
const router = Router();
const {controllerCreateOrder,controllerindexOrder } = require('../controllers/controllerOrder')

router.post("/", controllerCreateOrder);
router.get("/", controllerindexOrder);

module.exports = router;