var express = require('express');
var router = express.Router();

let participateController = require('../controllers/participate');

/* POST User Participate */
router.post('/post', participateController.postParticipate);

module.exports = router;
