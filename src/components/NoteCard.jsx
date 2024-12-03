import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { useState } from "react";

const NoteCard = ({ note, onDelete, onEdit, bgColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const createdAt = new Date(note.createdAt).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const updatedAt = new Date(note.updatedAt).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const truncatedText = note.text.length > 100 ? note.text.slice(0, 100) + "..." : note.text;

  return (
    <motion.div
    
      className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative ${bgColor}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
    >
      <p className="text-gray-700 text-sm font-medium break-words">
        {isExpanded ? note.text : truncatedText}
      </p>
      {note.text.length > 100 && (
        <button
          onClick={toggleText}
          className="text-[15px] font-semibold text-gray-900 hover:text-gray-700 mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      <div className="flex flex-row justify-between items-center pt-2">
      <div className="text-xs text-gray-600 text-opacity-90">
        <p>Created: {createdAt}</p>
        <p>Updated: {updatedAt}</p>
      </div>
      <div className="flex gap-1">

        <button
          className="text-gray-700 hover:text-blue-600"
          onClick={() => onEdit(note)}
          >
          <FaEdit size={20} />
        </button>

        <button
          className="text-gray-700 hover:text-red-600"
          onClick={() => onDelete(note._id)}
          >
          <FaTrashAlt size={20} />
        </button>
          </div>
      </div>
      
    </motion.div>
  );
};

export default NoteCard;
