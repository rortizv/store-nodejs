const { models } = require('../libs/sequelize');

class CategoryService {

  constructor() {
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const result = await models.Category.findAll({});
    return result;
  }

  async findOne(id) {
    const result = await models.Category.findByPk(id, {
      include: ['products']
    });
    return result;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
