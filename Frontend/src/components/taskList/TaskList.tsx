import { useState } from "react";
import { CgMathPlus } from "react-icons/cg";

export interface taskInterface {
  id: string;
  title: string;
}

function TaskList({ title, id }: taskInterface) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Nueva tarjeta",
      desc: "Esta es una descripción de prueba",
    },
  ]);

  return (
    <div id={id} className="bg-[#1b1b1b] w-[300px] px-3 py-3 rounded-2xl">
      <h1 className="text-slate-800 dark:text-gray-300 mb-2 px-5 font-medium">
        {title}
      </h1>
      <div className="my-2 flex flex-col gap-3">
        {id === "1"
          ? tasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 px-3 py-[6px] rounded cursor-pointer hover:brightness-125 "
              >
                <p className="text-slate-800 dark:text-gray-300 font-normal">
                  {task.title}
                </p>
              </div>
            ))
          : null}
      </div>
      <div className="flex items-center gap-2 hover:bg-[#96969663] cursor-pointer py-1 px-2 rounded duration-300">
        <CgMathPlus className="text-slate-800 dark:text-gray-300 text-[20px]" />
        <p className="text-slate-800 dark:text-gray-300">Añadir una tarjeta</p>
      </div>
    </div>
  );
}

export default TaskList;
