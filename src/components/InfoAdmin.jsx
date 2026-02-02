function InfoAdmin({ usuario, onLogout, onLoginClick }) {
  return (
    <div className="flex items-center gap-4">
      {usuario ? (
        <>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-emerald-400 text-sm">Admin: {usuario}</span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-white/5 text-white/70 rounded-2xl hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all flex items-center gap-2 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Tancar sessió
          </button>
        </>
      ) : (
        <button
          onClick={onLoginClick}
          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all flex items-center gap-2 font-medium shadow-lg shadow-violet-500/25"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Iniciar sessió
        </button>
      )}
    </div>
  );
}

export default InfoAdmin;
