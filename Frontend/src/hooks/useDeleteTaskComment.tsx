import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/tasksSlice";
import { deleteComment } from "../features/tasksSlice";

const useDeleteTaskComment = (taskId: string) => {
  const taskOptions = useAppSelector((state) => state.tasksProps);
  const filteredTask = taskOptions.find((task) => task.id === taskId);
  const [taskCoverOption, setTaskCoverOption] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteTaskComment = (commentId: string) => {
    if (filteredTask) {
      const updatedTasksComments = taskOptions.map((task) => {
        if (task.id === filteredTask.id) {
          const updatedComments = task.comments?.filter(
            (comment) => comment.id !== commentId
          );
          return { ...task, comments: updatedComments };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasksComments));
      dispatch(deleteComment({ taskId: filteredTask.id, id: commentId }));
    }
  };

  const handleOpenCoverMenu = () => {
    setTaskCoverOption(!taskCoverOption);
  };

  return {
    handleDeleteTaskComment,
    handleOpenCoverMenu,
    taskCoverOption,
    setTaskCoverOption,
  };
};

export default useDeleteTaskComment;
