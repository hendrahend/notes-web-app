import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import NoteCard from "./components/NoteCard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const App = () => {
  const storedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(storedTheme || "system");
  const [darkMode, setDarkMode] = useState(
    storedTheme === "dark" || (storedTheme === "system" && systemTheme)
  );

  useEffect(() => {
    if (theme === "system") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(isSystemDark);
    } else {
      setDarkMode(theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [darkMode, theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const addNote = () => {
    if (input.trim()) {
      const newNote = { id: uuidv4(), text: input };
      setNotes([...notes, newNote]);
      setInput("");
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const startEditing = (note) => {
    setEditMode(true);
    setCurrentEdit(note);
    setInput(note.text);
  };

  const saveEdit = () => {
    const updatedNotes = notes.map((note) =>
      note.id === currentEdit.id ? { ...note, text: input } : note
    );
    setNotes(updatedNotes);
    setEditMode(false);
    setInput("");
    setCurrentEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">Notes App</h1>
          <div>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow appearance-none"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <textarea
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-600 dark:text-gray-200"
            placeholder="Write your note here..."
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            className={`mt-2 px-4 py-2 ${
              editMode ? "bg-green-500" : "bg-blue-500"
            } text-white rounded-lg shadow hover:${
              editMode ? "bg-green-600" : "bg-blue-600"
            }`}
            onClick={editMode ? saveEdit : addNote}
          >
            {editMode ? "Save Edit" : "Add Note"}
          </button>
        </div>

        {/* Apply framer-motion to animate the notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }} // Animation duration
            >
              <NoteCard
                note={note}
                onDelete={deleteNote}
                onEdit={startEditing}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
