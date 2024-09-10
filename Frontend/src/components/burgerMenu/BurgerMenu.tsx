import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function BurgerMenu(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "backInOut" }}
      style={{ originX: 1, originY: 0 }}
      className="bg-white shadow-lg rounded dark:bg-[#393C73] p-3 absolute top-[45px] right-0 w-[150px]"
    >
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          className="text-slate-800 dark:text-white w-full text-center font-medium"
          to=""
        >
          Iniciar sesión
        </Link>
        <Link
          className="text-slate-800 dark:text-white w-full text-center font-medium"
          to=""
        >
          Registrarse
        </Link>
      </div>
      <hr className="my-2" />
      <Link
        className="text-slate-800 dark:text-white w-full text-center text-sm font-medium"
        to="/my-board"
      >
        Mis tableros
      </Link>
    </motion.div>
  );
}

export default BurgerMenu;
