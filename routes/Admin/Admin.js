const express = require("express");

const router = express.Router()

const Adminctrl = require("../../controllers/Admin/Admin")

router.post("/register/admin",Adminctrl.register)
router.post("/login/admin",Adminctrl.login)

module.exports=router