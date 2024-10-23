import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import { getConnectionPool } from "./database.js"; // Use ES module import
import corsOptions from "./config/corsOptions.js";
import path from "path"; // Import path module

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5001; // Use environment variable for port

app.use(cors(corsOptions)); // Enable CORS for cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests

app.use("/api", apiRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(process.cwd(), "client/build"))); // Serve static files

// Catch-all route to serve index.html for any unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "client/build", "index.html"));
});

// Connect to the database
getConnectionPool().catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1); // Exit if the database connection fails
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
