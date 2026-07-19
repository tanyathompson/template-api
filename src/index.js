import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import createItemTable from "./data/createItemTable.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(cors());

// // Routes
app.use("/api", testRoutes);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        myapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Sample route
app.get('/api/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

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

// app.listen(port, () => {
//     console.log(`Server is running on http:localhost:${port}`);
// })