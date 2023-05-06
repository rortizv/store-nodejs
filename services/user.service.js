const {models} = require('./../libs/sequelize');
const boom = require('@hapi/boom');


class UserService {
  constructor() { }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const result = await models.User.findAll({
      include: [ 'customer' ]
    });
    return result;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const result = await user.update(changes);
    return result;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
