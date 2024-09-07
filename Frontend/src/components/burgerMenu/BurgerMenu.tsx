import { Link } from "react-router-dom";

function BurgerMenu(): JSX.Element {
  return (
    <div className="bg-white shadow-lg rounded p-3 absolute top-[40px] right-0 w-[150px]">
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          className="text-slate-800 dark:text-white w-full text-center font-medium"
          to=""
        >
          Iniciar sesión
        </Link>
        <Link
          className="text-slate-800 dark:text-white w-full text-center font-medium"
          to=""
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default BurgerMenu;
