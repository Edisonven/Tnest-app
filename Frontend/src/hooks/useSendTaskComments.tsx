import { useState } from "react";
import { sendTaskComments } from "../features/tasksSlice";
import { useAppSelector, useAppDispatch } from "../features/tasksSlice";

const useSendTaskComments = (taskId: string) => {
  const [openActivityMenu, setOpenActivityMenu] = useState(false);
  const taskOptions = useAppSelector((state) => state.tasksProps);
  const [taskComments, setTaskComments] = useState("");
  const filteredTask = taskOptions.find((task) => task.id === taskId);
  const dispatch = useAppDispatch();

  const handleSendTaskComments = () => {
    if (filteredTask) {
      const id = crypto.randomUUID();
      const updatedTasksComments = taskOptions.map((task) => {
        if (task.id === filteredTask.id) {
          const newComments = [
            ...(task.comments || []),
            { id, comment: taskComments },
          ];
          return { ...task, comments: newComments };
        }
        return task;
      });

      if (taskComments.trim() === "") {
        return setOpenActivityMenu(false);
      }

      dispatch(
        sendTaskComments({
          comments: taskComments,
          id: id,
          taskId: filteredTask.id,
        })
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasksComments));
      setOpenActivityMenu(false);
      setTaskComments("");
    }
  };

  const handleOpenActivityMenu = () => {
    setOpenActivityMenu(!openActivityMenu);
  };

  return {
    handleSendTaskComments,
    openActivityMenu,
    setOpenActivityMenu,
    taskComments,
    setTaskComments,
    handleOpenActivityMenu,
  };
};

export default useSendTaskComments;
