import { FaCircleUser } from "react-icons/fa6";

function Navbar(): JSX.Element {
  return (
    <section className="bg-white dark:bg-[#393C73] p-2">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div>
          <h1 className="font-bold">TASKMANAGEMENT</h1>
        </div>
        <div className="relative">
          <FaCircleUser className="text-[30px] text-teal-500 dark:text-slate-400 cursor-pointer select-none" />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
