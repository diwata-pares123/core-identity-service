const Joi = require('joi');

const userRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required()
});

module.exports = {
    userRegistrationSchema
};