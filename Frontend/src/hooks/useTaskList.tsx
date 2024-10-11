import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../features/tasksSlice";
import { setTaskInfo } from "../features/tasksSlice";

const useTaskList = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskListId, setTaskListId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const globalStateTasks = useAppSelector((state) => state.tasksProps);

  const handleSendNewTask = () => {
    if (taskTitle.trim() !== "" && taskListId) {
      const newTask = {
        id: crypto.randomUUID(),
        title: taskTitle,
        taskListId: taskListId,
      };

      dispatch(setTaskInfo(newTask));
      localStorage.setItem(
        "tasks",
        JSON.stringify([...globalStateTasks, newTask])
      );
      setTaskTitle("");
      setTaskListId(null);
    }
  };

  const handleAddNewTask = (id: string) => {
    setTaskListId(id);

    if (taskListId === null) {
      setTaskTitle("");
    }
  };

  return {
    taskTitle,
    setTaskTitle,
    handleSendNewTask,
    handleAddNewTask,
    taskListId,
    setTaskListId,
  };
};

export default useTaskList;
