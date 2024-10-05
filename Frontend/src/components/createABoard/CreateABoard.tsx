import { motion } from "framer-motion";
import CreateABoardModal from "./CreateABoardModal";
import { useContext, useEffect, useRef, useState } from "react";
import { DomRefElement } from "../../types/DomRefElement";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CreateNewBoardMenu from "./CreateNewBoardMenu";
import { CreateBoardMenuContext } from "../../context/CreateBoardContext";

function CreateABoard() {
  const [openModal, setOpenModal] = useState(false);
  const { openCreateBoardMenu, setOpenCreateBoardMenu } = useContext(
    CreateBoardMenuContext
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<DomRefElement>(null);
  const navigate = useNavigate();

  const handleOpenBoardModal = () => {
    setOpenModal(!openModal);
    setOpenCreateBoardMenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      modalRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setOpenModal(false);
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
