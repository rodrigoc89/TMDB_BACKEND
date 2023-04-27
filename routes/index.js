const { Router } = require("express");
const routerUsers = require("./user");

const router = Router();

router.use("/users", routerUsers);

module.exports = router;
