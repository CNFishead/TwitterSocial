const express = require("express");
const login = require("../controllers/Auth/login");
const registerUser = require("../controllers/Auth/registerUser");

const router = express.Router();

/**
 * @access     Public
 * @route      POST /api/auth/login
 *
 */

router.post(`/login`, login);
router.post(`/register`, registerUser);

module.exports = router;
