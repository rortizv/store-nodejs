const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    }
}


class User extends Model {

  static associate(models) {
    // define association here
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }

}

module.exports = { User, UserSchema, USER_TABLE };
