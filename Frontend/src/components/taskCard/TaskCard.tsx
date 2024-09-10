export interface taskIterface {
  id: number;
  title: string;
  desc?: string;
}

function TaskCard({ id, title }: taskIterface) {
  return (
    <div
      key={id}
      className="bg-slate-800 px-3 py-[6px] rounded cursor-pointer hover:brightness-125 hover:outline outline-1 outline-white "
    >
      <p className="text-slate-800 dark:text-gray-300 font-normal">{title}</p>
    </div>
  );
}

export default TaskCard;
