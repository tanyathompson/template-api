import express from "express"
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from "../controllers/testController.js";
import validateItem from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/items", validateItem, createItem);
router.get("/items", getAllItems);
router.get("items/:id", getItemById);
router.put("items/:id", validateItem, updateItem);
router.delete("items/:id", deleteItem);

export default router;

