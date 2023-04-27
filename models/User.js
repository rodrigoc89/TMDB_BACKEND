const Sequelize = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field cannot be null",
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Field cannot be null",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "The field has to be valid email",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "User", timestamps: false }
);

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

User.prototype.validatePassword = function (password) {
  return this.hash(password, this.salt).then(
    (hashed) => hashed === this.password
  );
};

User.addHook("beforeValidate", (user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hashed) => {
    user.password = hashed;
  });
});

module.exports = User;
