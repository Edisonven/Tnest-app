import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

interface BoardMenuContextType {
  openCreateBoardMenu: boolean;
  setOpenCreateBoardMenu: Dispatch<SetStateAction<boolean>>;
  setDraggedTaskId: Dispatch<SetStateAction<string | null>>;
  draggedTaskId: string | null;
  draggingTaskIndex: number | null;
  setDraggingTaskIndex: Dispatch<SetStateAction<number | null>>;
  homeButonRef: React.MutableRefObject<HTMLButtonElement | null>;
}

const defaultContextValue: BoardMenuContextType = {
  openCreateBoardMenu: false,
  setOpenCreateBoardMenu: () => {},
  draggedTaskId: null,
  setDraggedTaskId: () => {},
  draggingTaskIndex: null,
  setDraggingTaskIndex: () => {},
  homeButonRef: { current: null },
};

export const BoardMenuContext =
  createContext<BoardMenuContextType>(defaultContextValue);

interface BoardMenuProviderProps {
  children: ReactNode;
}

const BoardMenuProvider = ({ children }: BoardMenuProviderProps) => {
  const [openCreateBoardMenu, setOpenCreateBoardMenu] =
    useState<boolean>(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(
    null
  );
  const homeButonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <BoardMenuContext.Provider
      value={{
        openCreateBoardMenu,
        setOpenCreateBoardMenu,
        draggedTaskId,
        setDraggedTaskId,
        draggingTaskIndex,
        setDraggingTaskIndex,
        homeButonRef,
      }}
    >
      {children}
    </BoardMenuContext.Provider>
  );
};

export default BoardMenuProvider;
