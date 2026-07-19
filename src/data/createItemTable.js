import pool from "../config/db.js";

const createItemTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) UNIQUE NOT NULL,
        createdTime TIMESTAMP DEFAULT NOW())`;

    try {
        pool.query(queryText);
        console.log("Items table created");
    } catch (error) {
        console.log("Error creating items table: ", error);
    }
};

export default createItemTable;