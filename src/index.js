import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createItemTable from "./data/createItemTable.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", testRoutes);

// Error handling
app.use(errorHandling);

// Create table before server start
createItemTable();

// Testing db connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
});

// Server running

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
})