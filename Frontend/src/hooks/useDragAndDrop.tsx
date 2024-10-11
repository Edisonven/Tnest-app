import { useContext } from "react";
import { useAppSelector, useAppDispatch } from "../features/tasksSlice";
import { moveTaskToColumn, setReOrderTaks } from "../features/tasksSlice";
import { BoardMenuContext } from "../context/BoardContext";

const useDragAndDrop = (id: string) => {
  const dispatch = useAppDispatch();
  const globalStateTasks = useAppSelector((state) => state.tasksProps);
  const { draggedTaskId, setDraggedTaskId, setDraggingTaskIndex } =
    useContext(BoardMenuContext);

  const handleDragStart = (draggedTaskId: string) => {
    setDraggedTaskId(draggedTaskId);
  };

  const handleDrop = () => {
    setDraggedTaskId(null);
  };

  const handleColumnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const itemFoundIndex = globalStateTasks.findIndex(
      (task) => task.id === draggedTaskId
    );

    if (itemFoundIndex !== -1) {
      const itemFound = { ...globalStateTasks[itemFoundIndex] };
      itemFound.taskListId = id;

      const newGlobalTaskState = globalStateTasks.map((task, index) => {
        if (index === itemFoundIndex) {
          return itemFound;
        }
        return task;
      });

      dispatch(moveTaskToColumn({ taskId: draggedTaskId, newColumnId: id }));
      localStorage.setItem("tasks", JSON.stringify(newGlobalTaskState));
    }
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();

    if (!draggedTaskId) return;

    setDraggingTaskIndex(targetIndex);
    const updatedTasks = [...globalStateTasks];
    const draggedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === draggedTaskId
    );

    if (draggedTaskIndex !== -1 && draggedTaskIndex !== targetIndex) {
      const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
      updatedTasks.splice(targetIndex, 0, draggedTask);
      dispatch(setReOrderTaks(updatedTasks));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return {
    handleDragStart,
    handleDrop,
    handleColumnDrop,
    handleDragOver,
  };
};

export default useDragAndDrop;
