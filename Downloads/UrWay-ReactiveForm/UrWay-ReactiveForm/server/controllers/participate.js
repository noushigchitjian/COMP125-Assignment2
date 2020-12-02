let express = require('express');
let Participate = require('../models/participate');



module.exports.postParticipate = (req, res, next) => {   
    Participate.create(req.body);
    res.json({message: "Post Participate Success!"});
}


