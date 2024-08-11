const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
