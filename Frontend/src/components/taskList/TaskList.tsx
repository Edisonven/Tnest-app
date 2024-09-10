import { useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { ChangeEvent } from "react";

export interface taskInterface {
  id: string;
  title: string;
}

const TaskList = ({ title, id }: taskInterface) => {
  const [taskListId, setTaskListId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Nueva tarjeta",
      desc: "Esta es una descripción de prueba",
    },
  ]);

  const handleAddNewTask = (id: string) => {
    if (id) {
      setTaskListId(id);
    } else {
      setTaskListId("");
    }

    if (taskListId === "") {
      setTaskTitle("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };

  return (
    <div
      id={id}
      className="bg-[#1b1b1b] w-[300px] px-3 py-3 rounded-2xl shadow-lg"
    >
      <h1 className="text-slate-800 dark:text-gray-300 mb-2 px-5 font-medium">
        {title}
      </h1>
      <div className="flex flex-col gap-3">
        {id === "1"
          ? tasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 px-3 py-[6px] rounded cursor-pointer hover:brightness-125 hover:outline outline-1 outline-white "
              >
                <p className="text-slate-800 dark:text-gray-300 font-normal">
                  {task.title}
                </p>
              </div>
            ))
          : null}
        <div>
          {id === taskListId ? (
            <div>
              <div className="px-2 bg-slate-800 relative rounded">
                <textarea
                  onChange={handleChange}
                  value={taskTitle}
                  name="task"
                  className="bg-transparent border-none text-slate-800 dark:text-gray-300 w-full outline-none resize-none"
                />
                {!taskTitle ? (
                  <p className="text-slate-800 dark:text-gray-300 text-sm font-normal absolute top-[3px] left-[9px] pointer-events-none">
                    Introduce un nombre para esta tarjeta...
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-1">
                <button className="bg-[#383e9e] text-slate-800 dark:text-gray-300 px-2 py-[6px] rounded shadow text-sm font-medium my-2 hover:brightness-125">
                  Añadir tarjeta
                </button>
                <IoClose
                  onClick={() => setTaskListId("")}
                  className="text-slate-800 dark:text-gray-300 cursor-pointer text-[30px] hover:bg-[#333333] rounded-full p-1"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {taskListId === id ? null : (
        <div
          onClick={() => handleAddNewTask(id)}
          className="flex items-center gap-2 hover:bg-[#96969663] cursor-pointer py-1 px-2 rounded duration-300"
        >
          <CgMathPlus className="text-slate-800 dark:text-gray-300 text-[20px]" />
          <button className="text-slate-800 dark:text-gray-300">
            Añadir una tarjeta
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
