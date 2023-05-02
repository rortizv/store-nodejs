const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');


class CustomerService {
  constructor() { }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const result = await models.Customer.findAll();
    return result;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('User not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const result = await customer.update(changes);
    return result;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
