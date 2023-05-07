const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');


class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isActive: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async getAll() {
    const result = await models.Product.findAll({
      include: [ 'category' ]
    });
    return result;
  }

  async getById(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (!product.isActive) {
      throw boom.conflict('Product is not active');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...data
      };
      return this.products[index];
    }
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    } else {
      this.products.splice(index, 1);
      return {
        message: 'Product deleted successfully!',
        id
      };
    }
  }

}

module.exports = ProductService;
