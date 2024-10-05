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
}

// Proporciona un valor predeterminado
const defaultContextValue: CreateBoardMenuContextType = {
  openCreateBoardMenu: false,
  setOpenCreateBoardMenu: () => {},
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

  return (
    <CreateBoardMenuContext.Provider
      value={{ openCreateBoardMenu, setOpenCreateBoardMenu }}
    >
      {children}
    </CreateBoardMenuContext.Provider>
  );
};

export default CreateBoardMenuProvider;
