import { useState, useEffect } from 'react';

export default function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [promocion, setPromocion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre || '');
      setApellidos(alumno.apellidos || '');
      setPromocion(alumno.promocion || '');
      setCiclo(alumno.ciclo || '');
      setUrlImagen(alumno.urlImagen || '');
    }
  }, [alumno]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, apellidos, promocion, ciclo, urlImagen });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-3xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {alumno ? "Editar Alumne" : "Nou Alumne"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-1">Nom</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">Cognoms</label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">Promoció</label>
            <input
              type="text"
              value={promocion}
              onChange={(e) => setPromocion(e.target.value)}
              required
              placeholder="2024/2025"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">Cicle</label>
            <input
              type="text"
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              required
              placeholder="DAW"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-1">URL Imatge</label>
            <input
              type="url"
              value={urlImagen}
              onChange={(e) => setUrlImagen(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition-all border border-white/10"
            >
              Cancel·lar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
            >
              {alumno ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}