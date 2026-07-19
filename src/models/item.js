import pool from "../config/db.js";

export const getAllItemsService = async () => {
    const result = await pool.query("SELECT * FROM items");
    return result.rows;
};
export const getItemByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM items where id = $1", [id]);
    return result.rows[0];
};
export const createItemService = async (name, description) => {
    const result = await pool.query("INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *", [name, description]);
    return result.rows[0];
};
export const updateItemService = async (name, description, id) => {
    const result = await pool.query("UPDATE items SET name=$1, description=$2 WHERE id=$3 RETURNING *", [name, description, id]);
    return result.rows[0];
};
export const deleteItemService = async (id) => {
    const result = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};