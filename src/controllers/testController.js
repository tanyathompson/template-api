import { createItemService, deleteItemService, getAllItemsService, getItemByIdService, updateItemService } from "../models/item.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createItem = async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const newItem = await createItemService(name, description);
        handleResponse(res, 201, "Item created successfully", newItem);
    } catch (err) {
        next(err);
    }
};

export const getAllItems = async (req, res, next) => {
    try {
        const items = await getAllItemsService();
        handleResponse(res, 200, "Items fetched successfully", items);
    } catch (err) {
        next(err);
    }
};

export const getItemById = async (req, res, next) => {
    try {
        const item = await getItemByIdService(req.params.id);
        if (!item) return handleResponse(res, 404, "Item not found");
        handleResponse(res, 200, "Item fetched successfully", item);
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const updatedItem = await updateItemService(req.params.id, name, description);
        if (!updatedItem) return handleResponse(res, 404, "Item not found");
        handleResponse(res, 200, "Item fetched successfully", updatedItem);
    } catch (err) {
        next(err);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const deletedItem = await deleteItemService(req.params.id);
        if (!deletedItem) return handleResponse(res, 404, "Item not found");
        handleResponse(res, 200, "Item deleted successfully", deletedItem);
    } catch (err) {
        next(err);
    }
};