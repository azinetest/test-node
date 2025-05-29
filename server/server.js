const express = require("express");
const connectDB = require("./src/config/db.config");
const routes = require("./src/modules/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const seedData = require("./src/modules/seeder");
connectDB().then(async () => {
  await seedData(); // this is seeder automatically run and you can run seeder using a commond also
});

// Ensure this line is included
app.use(express.json());

const corsOptions = {
  origin: "*", // only allow this origin
  methods: "*",
  allowedHeaders: "*",
};

app.use(cors(corsOptions));
app.use("/api", routes);

// Run the server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
