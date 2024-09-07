import { FaCircleUser } from "react-icons/fa6";

function Navbar(): JSX.Element {
  return (
    <section className="bg-white dark:bg-[#393C73] p-2">
      <div>
        <div>
          <FaCircleUser className="text-[30px] text-teal-500 dark:text-slate-400" />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
