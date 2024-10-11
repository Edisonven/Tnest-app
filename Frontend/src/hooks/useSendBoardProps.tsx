import { useAppDispatch } from "../features/tasksSlice";
import { FormEvent, useRef, useState } from "react";
import { setTitle, setImage } from "../features/boardBackgroundSlice";
import board1 from "/images/application/boards-background/board-1.png";
import { useNavigate } from "react-router-dom";

const useSendBoardProps = (
  setOpenCreateBoardMenu: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [boardCreatedAltert, setBoardCreatedAlert] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [boardImage, setBoardImage] = useState(board1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const alertTimeoutRef = useRef<number | null>(null);

  const handleSendBoardProps = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { image, title } = JSON.parse(localStorage.getItem("board") || "{}");

    if (image || title) {
      setBoardCreatedAlert(
        "Para crear más de un tablero, registrate e inicia sesión"
      );
      restartAlertTimeout();
      return;
    }

    if (boardTitle.trim() === "") {
      return setError("El título es obligatorio *");
    } else {
      navigate("/my-board");
    }

    dispatch(setImage(boardImage));
    dispatch(setTitle(boardTitle));

    const boardData = {
      image: boardImage,
      title: boardTitle.trim(),
    };

    localStorage.setItem("board", JSON.stringify(boardData));
    setBoardTitle("");
    setOpenCreateBoardMenu(false);
  };

  const restartAlertTimeout = () => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = window.setTimeout(() => {
      setBoardCreatedAlert("");
    }, 3000);
  };

  return {
    handleSendBoardProps,
    boardCreatedAltert,
    boardTitle,
    setBoardCreatedAlert,
    setBoardTitle,
    setBoardImage,
    setError,
    alertTimeoutRef,
    boardImage,
    error,
  };
};

export default useSendBoardProps;
