const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const apiRoutes = require("./routes/api.js");
const { getConnectionPool } = require("./database.js");
const corsOptions = require("./config/corsOptions.js");

dotenv.config(); // Load environment variables

const app = express();
const port = 5001;

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRoutes);

getConnectionPool().catch((err) => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
