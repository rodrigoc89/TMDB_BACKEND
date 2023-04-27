const Sequelize = require("sequelize");
const db = require("../db/index");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    movieId: {
      type: Sequelize.INTEGER,
    },
    movieType: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "Favorites", timestamps: false }
);

module.exports = Favorites;
