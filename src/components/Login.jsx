import { useState } from 'react';

function Login({ onLogin, onClose }) {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.usuario.trim() || !formData.password.trim()) {
      setError('Tots els camps són obligatoris');
      return;
    }

    const result = onLogin(formData.usuario, formData.password);
    if (!result) {
      setError('Credencials incorrectes');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-3xl w-full max-w-sm relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-violet-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Iniciar Sessió</h2>
            <p className="text-white/40 text-sm mt-2">Accedeix com a administrador</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-white/60 mb-2">
                Usuari
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="dark-input w-full px-4 py-3 rounded-xl"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-2">
                Contrasenya
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="dark-input w-full px-4 py-3 rounded-xl"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all font-semibold shadow-lg shadow-violet-500/25"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/30">
              Credencials per defecte: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
