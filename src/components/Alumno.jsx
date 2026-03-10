function Alumno({ nombre, apellidos, promo, ciclo, esAdmin, onEdit, onDelete, children }) {
  // Colores para cada ciclo - dark theme
  const cicloColors = {
    DAW: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    SMX: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    ARI: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    IEA: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
  };

  return (
    <div className="glass-card alumno-card rounded-3xl p-6 relative group transition-all duration-300 cursor-pointer">
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      {/* Iconos de administrador */}
      {esAdmin && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={onEdit}
            className="p-2.5 bg-white/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-xl transition-all hover:scale-110 border border-white/10"
            title="Editar alumno"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2.5 bg-white/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-xl transition-all hover:scale-110 border border-white/10"
            title="Eliminar alumno"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Avatar (children) */}
      <div className="flex justify-center mb-5 relative">
        {children}
      </div>

      {/* Información del alumno */}
      <div className="text-center space-y-1 relative">
        <h3 className="text-lg font-bold text-white">{nombre}</h3>
        <p className="text-white/50 text-sm">{apellidos}</p>
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cicloColors[ciclo] || 'bg-white/10 text-white/70'}`}>
            {ciclo}
          </span>
          <span className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs font-medium border border-white/10">
            {promo}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Alumno;
