const express = require('express');
const router = express.Router();
const { authController } = require( '../controllers/auth.controller' );
const auth = require("../middlewares/authentication")

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile',auth(), authController.getProfile);
router.put('/profile',auth(), authController.updateProfile);


module.exports = router;
