export interface ThemeMenuProps {
    aplicationTheme: string;
    setApplicationTheme: React.Dispatch<React.SetStateAction<string>>;
}

export interface OpenCreateBoardMenu {
    openCreateBoardMenu?: boolean;
    setOpenCreateBoardMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}