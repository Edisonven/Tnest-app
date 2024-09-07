import { motion } from "framer-motion";

function CreateABoard() {
  return (
    <motion.section
      whileTap={{ scale: 0.92 }}
      className="bg-teal-300 rounded shadow dark:bg-[#a0a0b9] hover:brightness-110"
    >
      <button className="text-slate-700 font-medium py-1 px-3 ">Crear</button>
    </motion.section>
  );
}

export default CreateABoard;
