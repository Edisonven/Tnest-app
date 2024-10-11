import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/tasksSlice";
import { sendTaskDescription } from "../features/tasksSlice";

const useSendTaskDescription = (taskId: string) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [openDescriptionMenu, setOpenDescriptionMenu] = useState(false);
  const [isDescriptionModified, setIsDescriptionModified] = useState(false);
  const dispatch = useAppDispatch();
  const taskOptions = useAppSelector((state) => state.tasksProps);
  const filteredTask = taskOptions.find((task) => task.id === taskId);

  const handleSendTaskDescription = () => {
    if (taskDescription) {
      dispatch(
        sendTaskDescription({
          taskId: filteredTask?.id,
          description: taskDescription,
        })
      );
      if (filteredTask) {
        const updatedTasks = taskOptions.map((task) =>
          task.id === filteredTask.id
            ? { ...task, description: taskDescription }
            : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setIsDescriptionModified(false);
      }
    } else {
      setOpenDescriptionMenu(false);
    }
  };

  const handleAddATaskDescription = () => {
    setOpenDescriptionMenu(!openDescriptionMenu);
  };

  const handleEditDescription = () => {
    setOpenDescriptionMenu(true);
    setIsDescriptionModified(true);
    if (filteredTask) {
      const editDescription = filteredTask.description;
      setTaskDescription(editDescription);
    }
  };

  return {
    handleSendTaskDescription,
    taskDescription,
    setTaskDescription,
    isDescriptionModified,
    setIsDescriptionModified,
    openDescriptionMenu,
    setOpenDescriptionMenu,
    handleAddATaskDescription,
    handleEditDescription,
  };
};

export default useSendTaskDescription;
