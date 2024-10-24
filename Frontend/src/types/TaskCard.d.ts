export interface TaskCardInterface {
    id: string;
    title: string;
    desc?: string;
    comments: Array<{
        id: string;
        comment: string;
    }>;
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (id: string) => void;
    setActiveColumn: React.Dispatch<React.SetStateAction<string | "">>;
    draggedTaskId: string | null;
    index: number;
    draggingTaskIndex: number | null;
    setDraggingTaskIndex: React.Dispatch<React.SetStateAction<number | null>>;
    columnTitle: string;
    cover?: string
}



export interface TaskCardOptionsProps {
    setOpenTaskOptions: React.Dispatch<React.SetStateAction<boolean>>;
    taskId: string;
    columnTitle: string;
    isTaskCardOptionsActive: boolean
}
