const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');


    router.get('/', pageController.get_home)
  
    router.get('/about', pageController.get_about)

    router.get('/login',pageController.get_login)

    router.get('/signup',pageController.get_signup)
 
    router.use(pageController.get_404)

module.exports = router;