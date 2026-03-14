import Note from "../models/Note.js";


export async function getAllNotes(req, res) {
    try {
        // Only return notes belonging to the logged-in user
        const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found!" });

        // Ensure the note belongs to the logged-in user
        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to access this note" });
        }

        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        // Link the new note to the logged-in user
        const newNote = new Note({ title, content, userId: req.user._id });
        await newNote.save();
        res.status(201).json({ message: "Note Created Successfully" });
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        // Ensure only the owner can update
        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.status(200).json({ message: "Note Updated Successfully" });
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function deleteNote(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Ensure only the owner can delete
        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted Successfully!" });
    } catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};