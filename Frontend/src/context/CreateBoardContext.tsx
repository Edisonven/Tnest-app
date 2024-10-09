import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CreateBoardMenuContextType {
  openCreateBoardMenu: boolean;
  setOpenCreateBoardMenu: Dispatch<SetStateAction<boolean>>;
  setDraggedTaskId: Dispatch<SetStateAction<string | null>>;
  draggedTaskId: string | null;
  draggingTaskIndex: number | null;
  setDraggingTaskIndex: Dispatch<SetStateAction<number | null>>;
}

const defaultContextValue: CreateBoardMenuContextType = {
  openCreateBoardMenu: false,
  setOpenCreateBoardMenu: () => {},
  draggedTaskId: null,
  setDraggedTaskId: () => {},
  draggingTaskIndex: null,
  setDraggingTaskIndex: () => {},
};

export const CreateBoardMenuContext =
  createContext<CreateBoardMenuContextType>(defaultContextValue);

interface CreateBoardMenuProviderProps {
  children: ReactNode;
}

const CreateBoardMenuProvider = ({
  children,
}: CreateBoardMenuProviderProps) => {
  const [openCreateBoardMenu, setOpenCreateBoardMenu] =
    useState<boolean>(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggingTaskIndex, setDraggingTaskIndex] = useState<number | null>(
    null
  );

  return (
    <CreateBoardMenuContext.Provider
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
    </CreateBoardMenuContext.Provider>
  );
};

export default CreateBoardMenuProvider;
