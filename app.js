const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routes/index");
const db = require("./db/index");
require("./models/index");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`);
  });
});

module.exports = app;
