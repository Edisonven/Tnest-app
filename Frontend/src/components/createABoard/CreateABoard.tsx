import { motion } from "framer-motion";
import CreateABoardModal from "./CreateABoardModal";
import { useContext, useEffect, useRef, useState } from "react";
import { DomRefElement } from "../../types/DomRefElement";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CreateNewBoardMenu from "./CreateNewBoardMenu";
import { BoardMenuContext } from "../../context/BoardContext";

function CreateABoard() {
  const [openModal, setOpenModal] = useState(false);
  const { openCreateBoardMenu, setOpenCreateBoardMenu, homeButonRef } =
    useContext(BoardMenuContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const boardMenuRef = useRef<DomRefElement>(null);
  const navigate = useNavigate();

  const handleOpenBoardModal = () => {
    setOpenModal(!openModal);
    setOpenCreateBoardMenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    const isClickOutsideModal =
      // Si existe el botón, evaluar la condición del botón; si no, sólo verifica el modal
      (!buttonRef.current ||
        (buttonRef.current && !buttonRef.current.contains(target))) &&
      modalRef.current &&
      !modalRef.current.contains(target);

    const isClickOutsideNewBoardMenu =
      // Si existe el botón del menú, evaluarlo; si no, sólo verifica el menú
      (!homeButonRef.current ||
        (homeButonRef.current && !homeButonRef.current.contains(target))) &&
      boardMenuRef.current &&
      !boardMenuRef.current.contains(target);

    // Cierra el modal si haces clic fuera del área
    if (isClickOutsideModal) {
      setOpenModal(false);
    }

    // Cierra el menú si haces clic fuera del área, ignorando el modal si existe
    if (isClickOutsideNewBoardMenu && !modalRef.current) {
      setOpenCreateBoardMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpenModal(false);
  }, [navigate]);

  return (
    <div className="relative">
      <motion.section
        whileTap={{ scale: 0.92 }}
        className="bg-teal-300 rounded shadow dark:bg-[#a0a0b9] hover:brightness-110"
      >
        <button
          ref={buttonRef}
          onClick={handleOpenBoardModal}
          className="text-slate-700 font-medium py-1 px-3 w-full h-full"
        >
          Crear
        </button>
      </motion.section>
      <AnimatePresence>
        {openModal ? (
          <CreateABoardModal
            openCreateBoardMenu={openCreateBoardMenu}
            setOpenCreateBoardMenu={setOpenCreateBoardMenu}
            setOpenModal={setOpenModal}
            ref={modalRef}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {openCreateBoardMenu ? (
          <CreateNewBoardMenu
            ref={boardMenuRef}
            setOpenCreateBoardMenu={setOpenCreateBoardMenu}
            openCreateBoardMenu={openCreateBoardMenu}
            setOpenModal={setOpenModal}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default CreateABoard;
