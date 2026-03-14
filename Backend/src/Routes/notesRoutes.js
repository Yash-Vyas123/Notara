import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../Controllers/notesControllers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All note routes are protected — user must be logged in
router.get("/", protect, getAllNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;