import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(cors());

// Routes

// Error handling


// Testing db connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
});

// Server running

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
})