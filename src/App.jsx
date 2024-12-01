import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import NoteCard from "./components/NoteCard";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get("https://notes-app-backend.vercel.app/api/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);
  
  const colors = [
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-red-300",
  ];

  const addNote = () => {
    if (input.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      axios
      .post("https://notes-app-backend.vercel.app/api/notes", { text: input, bgColor: randomColor })
      .then((response) => {
        const newNote = { ...response.data };
        setNotes((prevNotes) => [...prevNotes, newNote]);
      } )
      .catch((error) => console.error("Error adding note:", error));
      setInput("");
      // const newNote = { id: uuidv4(), text: input, bgColor: randomColor };
      // setNotes([...notes, newNote]);
      // setInput("");
    }
  };

  const deleteNote = (id) => {
    axios
    .delete(`https://notes-app-backend.vercel.app/api/notes/${id}`)
    .then(() => setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)))
    // .then(() => setNotes(notes.filter((note) => note._id !== id)))
    .catch((error) => console.error("Error deleting note:", error));
    // const updatedNotes = notes.filter((note) => note.id !== id);
    // setNotes(updatedNotes);
  };

  const startEditing = (note) => {
    setEditMode(true);
    setCurrentEdit(note);
    setInput(note.text);
  };

  const saveEdit = () => {
    axios
      .put(`https://notes-app-backend.vercel.app/api/notes/${currentEdit._id}`, { text: input })
      .then((response) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentEdit._id ? { ...response.data, bgColor: note.bgColor } : note
          )
        );
        setEditMode(false);
        setInput("");
        setCurrentEdit(null);
      })
      .catch((error) => console.error("Error updating note:", error));
  };
  // const saveEdit = () => {
  //   const updatedNotes = notes.map((note) =>
  //     note.id === currentEdit.id ? { ...note, text: input } : note
  //   );
  //   setNotes(updatedNotes);
  //   setEditMode(false);
  //   setInput("");
  //   setCurrentEdit(null);
  // };
  return (
    <div className="min-h-screen bg-[#FFE6A9] dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center bg-[#DEAA79] rounded-lg px-4 py-1">Notes App</h1>
          <div className="flex gap-2">
        {/* Light Mode Button */}
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-full ${
            theme === "light"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          aria-label="Light Mode"
        >
          <FaSun />
        </button>

        {/* Dark Mode Button */}
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-full ${
            theme === "dark"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          aria-label="Dark Mode"
        >
          <FaMoon />
        </button>

        {/* System Mode Button */}
        <button
          onClick={() => setTheme("system")}
          className={`p-2 rounded-full ${
            theme === "system"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          aria-label="System Mode"
        >
          <FaDesktop />
        </button>
      </div>
        </div>
        <div className="mb-6">
          <textarea
            className="w-full bg-gray-200 text-sm p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-600 dark:text-gray-200"
            placeholder="Write your note here..."
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            className={`mt-2 px-4 py-2 text-sm hover:bg-[#557a71] transition-all ${
              editMode ? "bg-green-500" : "bg-[#659287]"
            } text-white rounded-lg shadow`}
            onClick={editMode ? saveEdit : addNote}
          >
            {editMode ? "Save Edit" : "Add Note"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NoteCard
                note={note}
                bgColor={note.bgColor} // Pass random background color
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
