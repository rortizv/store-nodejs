const Joi = require('joi');

const id = Joi.number().integer();
const fullname = Joi.string().max(200);
const phone = Joi.string();
const address = Joi.string().max(200);
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  fullname: fullname.required(),
  phone: phone.required(),
  address: address.required(),
  userId: userId.required()
});

const updateCustomerSchema = Joi.object({
  fullname: fullname,
  phone: phone,
  address: address,
  userId: userId
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
