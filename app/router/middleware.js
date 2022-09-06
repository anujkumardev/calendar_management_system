const Joi = require('joi');
const UserRegister = (req,res,next)=>{
    const Validation = Joi.object().keys({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow : ['com', 'net'] } }).required(),
        name : Joi.string().alphanum().required(),
    });
    const {error} = Validation.validate(req.body);
    if(error){
        res.status(400).send(error);
    }
    next();
}

const UsersMeeting = (req, res, next)=>{
    const Validation = Joi.object().keys({
        dd : Joi.number().integer().min(1).max(31).required(),
        mm : Joi.number().integer().min(1).max(12).required(),
        start : Joi.number().integer().min(0).max(1440).required(),
        duration : Joi.number().integer().min(2).max(1440).required(),
        user_list : Joi.array().items(Joi.string().alphanum().required())
    });
    const {error} = Validation.validate(req.body);
    if(error){
        res.status(400).send(error);
    }
    next();
}

module.exports = {
    UserRegister,
    UsersMeeting
};