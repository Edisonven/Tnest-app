import { motion } from "framer-motion";
import CreateABoardModal from "./CreateABoardModal";
import { useEffect, useRef, useState } from "react";
import { DomRefElement } from "../../types/DomRefElement";

function CreateABoard() {
  const [openModal, setOpenModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<DomRefElement>(null);

  const handleOpenBoardModal = () => {
    setOpenModal(!openModal);
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

  return (
    <div className="relative">
      <motion.section
        whileTap={{ scale: 0.92 }}
        className="bg-teal-300 rounded shadow dark:bg-[#a0a0b9] hover:brightness-110"
      >
        <button
          ref={buttonRef}
          onClick={handleOpenBoardModal}
          className="text-slate-700 font-medium py-1 px-3 "
        >
          Crear
        </button>
      </motion.section>
      {openModal ? <CreateABoardModal ref={modalRef} /> : null}
    </div>
  );
}

export default CreateABoard;
