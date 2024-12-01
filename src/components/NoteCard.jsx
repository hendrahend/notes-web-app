import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { useState } from "react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = note.text.length > 100 ? note.text.slice(0, 100) + "..." : note.text;

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
      whileHover={{ scale: 1.05 }} // Slight scale effect on hover
      whileTap={{ scale: 0.98 }} // Slight tap effect
    >
      <p className="text-gray-700">
        {isExpanded ? note.text : truncatedText}
      </p>
      {note.text.length > 100 && (
        <button
          onClick={toggleText}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      <div className="flex flex-row-reverse space-x-4 mt-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(note)}
        >
          <FaEdit size={20} />
        </button>

        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(note.id)}
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
