const ConfirmDeleteModal = () => {
  return (
    <div className="absolute top-[110%] left-0 bg-gray-300 dark:bg-[#29292c] z-50 rounded outline outline-1 dark:outline-gray-700 p-3 w-[280px]">
      <h1 className="text-slate-800 dark:text-gray-300 text-sm font-medium">
        ¿Desea eliminar la tarejta?
      </h1>
      <div className="mt-2">
        <p className="text-slate-800 dark:text-gray-300 text-sm font-medium">
          Se borrará todo el contenido de la tarjeta, la tarjeta no podrá volver
          a abrirse. esta acción es irreversible.
        </p>
      </div>
      <button className="bg-rose-500 dark:text-slate-800 text-gray-300 font-semibold py-1 px-3 rounded w-full text-center mt-4 hover:bg-[#fc6d85]">
        Eliminar
      </button>
    </div>
  );
};

export default ConfirmDeleteModal;
