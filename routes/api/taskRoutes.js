const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authMiddleware } = require("../../utils/authMiddleware");

router.use(authMiddleware);
module.exports = router;