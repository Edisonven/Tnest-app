import { CgMathPlus } from "react-icons/cg";

function TaskList() {
  return (
    <div className="bg-black w-[300px] px-3 py-3 rounded-2xl">
      <h1 className="text-slate-800 dark:text-gray-300 mb-2 px-5">
        Lista de tareas
      </h1>
      <div>{/*Acá se debe renderizar cada tarjeta creada */}</div>
      <div className="flex items-center gap-2 hover:bg-[#96969663] cursor-pointer py-1 px-2 rounded duration-300">
        <CgMathPlus className="text-slate-800 dark:text-gray-300 text-[20px]" />
        <p className="text-slate-800 dark:text-gray-300">Añadir una tarjeta</p>
      </div>
    </div>
  );
}

export default TaskList;
