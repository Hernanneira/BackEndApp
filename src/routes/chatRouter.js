const { Router } = require("express");
const router = Router();
const {getIndexChat, getEmailChat,} = require('../controllers/controllerChat')

router.get("/", getIndexChat );
router.get("/:email", getEmailChat);

module.exports = router;