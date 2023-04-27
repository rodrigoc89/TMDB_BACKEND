const User = require("./User");
const Favorites = require("./Favorites");

User.hasMany(Favorites);
Favorites.belongsTo(User);
