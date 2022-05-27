const express = require('express')
const UserController = require('../controllers/MovieControllers')
const router = express.Router();
router.get('/movie/show', UserController.findAll);
module.exports = router