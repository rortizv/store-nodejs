const Joi = require('joi');

const id = Joi.number().integer();
const fullname = Joi.string().max(200);
const phone = Joi.string();
const address = Joi.string().max(200);
const email = Joi.string().email();
const password = Joi.string().min(6).max(200);
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  fullname: fullname.required(),
  phone: phone.required(),
  address: address.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  fullname: fullname,
  phone: phone,
  address: address,
  userId: userId
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
