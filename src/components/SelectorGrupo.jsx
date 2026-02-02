function SelectorGrupo({ grupos, grupoSeleccionado, onGrupoChange }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="grupo" className="text-white/40 font-medium whitespace-nowrap text-sm hidden sm:block">
        Cicle
      </label>
      <select
        id="grupo"
        value={grupoSeleccionado}
        onChange={(e) => onGrupoChange(e.target.value)}
        className="dark-input w-full sm:w-auto px-4 py-2.5 rounded-xl cursor-pointer"
      >
        <option value="">Tots els cicles</option>
        {grupos.map((grupo) => (
          <option key={grupo} value={grupo}>
            {grupo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorGrupo;
