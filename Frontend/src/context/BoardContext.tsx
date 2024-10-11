import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface  BoardMenuContextType {
  openCreateBoardMenu: boolean;
  setOpenCreateBoardMenu: Dispatch<SetStateAction<boolean>>;
  setDraggedTaskId: Dispatch<SetStateAction<string | null>>;
  draggedTaskId: string | null;
  draggingTaskIndex: number | null;
  setDraggingTaskIndex: Dispatch<SetStateAction<number | null>>;
}

const defaultContextValue:  BoardMenuContextType = {
  openCreateBoardMenu: false,
  setOpenCreateBoardMenu: () => {},
  draggedTaskId: null,
  setDraggedTaskId: () => {},
  draggingTaskIndex: null,
  setDraggingTaskIndex: () => {},
};

export const  BoardMenuContext =
  createContext< BoardMenuContextType>(defaultContextValue);

interface BoardMenuProviderProps {
  children: ReactNode;
}

const BoardMenuProvider = ({
  children,
}: BoardMenuProviderProps) => {
  const [openCreateBoardMenu, setOpenCreateBoardMenu] =
    useState<boolean>(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(
    null
  );

  return (
    < BoardMenuContext.Provider
      value={{
        openCreateBoardMenu,
        setOpenCreateBoardMenu,
        draggedTaskId,
        setDraggedTaskId,
        draggingTaskIndex,
        setDraggingTaskIndex,
      }}
    >
      {children}
    </ BoardMenuContext.Provider>
  );
};

export default BoardMenuProvider;
