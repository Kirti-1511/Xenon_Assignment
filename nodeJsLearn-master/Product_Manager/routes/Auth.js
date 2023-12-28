const express = require('express');
const Auth = require('../controllers/Auth')
const router = express.Router();

router.post('/login', Auth.postAuthLogin)
router.get('/login', Auth.getAuthLogin)
router.get('/signup', Auth.getSignUpPage)
router.post('/signup', Auth.postSignUp)
router.post('/logout_user', Auth.logout_user)

module.exports = router;