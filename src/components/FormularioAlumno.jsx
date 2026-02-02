import { useState, useEffect } from 'react';

const CICLOS = ['DAW', 'SMX', 'ARI', 'IEA'];
const PROMOCIONES = ['2022/2023', '2023/2024', '2024/2025', '2025/2026'];

function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    promocion: '',
    ciclo: '',
    urlImagen: ''
  });
  const [errors, setErrors] = useState({});

  // Cargar datos del alumno si estamos en modo edición
  useEffect(() => {
    if (alumno) {
      setFormData({
        nombre: alumno.nombre || '',
        apellidos: alumno.apellidos || '',
        promocion: alumno.promocion || '',
        ciclo: alumno.ciclo || '',
        urlImagen: alumno.urlImagen || ''
      });
    }
  }, [alumno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nom és obligatori';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Els cognoms són obligatoris';
    if (!formData.promocion) newErrors.promocion = 'La promoció és obligatòria';
    if (!formData.ciclo) newErrors.ciclo = 'El cicle és obligatori';
    if (!formData.urlImagen.trim()) newErrors.urlImagen = 'La URL de la imatge és obligatòria';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {alumno ? 'Editar Alumne' : 'Nou Alumne'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-white/60 mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`dark-input w-full px-4 py-3 rounded-xl ${
                  errors.nombre ? 'border-red-500/50' : ''
                }`}
              />
              {errors.nombre && <p className="text-red-400 text-sm mt-2">{errors.nombre}</p>}
            </div>

            {/* Apellidos */}
            <div>
              <label htmlFor="apellidos" className="block text-sm font-medium text-white/60 mb-2">
                Cognoms *
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className={`dark-input w-full px-4 py-3 rounded-xl ${
                  errors.apellidos ? 'border-red-500/50' : ''
                }`}
              />
              {errors.apellidos && <p className="text-red-400 text-sm mt-2">{errors.apellidos}</p>}
            </div>

            {/* Promoción */}
            <div>
              <label htmlFor="promocion" className="block text-sm font-medium text-white/60 mb-2">
                Promoció *
              </label>
              <select
                id="promocion"
                name="promocion"
                value={formData.promocion}
                onChange={handleChange}
                className={`dark-input w-full px-4 py-3 rounded-xl cursor-pointer ${
                  errors.promocion ? 'border-red-500/50' : ''
                }`}
              >
                <option value="">Selecciona una promoció</option>
                {PROMOCIONES.map(promo => (
                  <option key={promo} value={promo}>{promo}</option>
                ))}
              </select>
              {errors.promocion && <p className="text-red-400 text-sm mt-2">{errors.promocion}</p>}
            </div>

            {/* Ciclo */}
            <div>
              <label htmlFor="ciclo" className="block text-sm font-medium text-white/60 mb-2">
                Cicle *
              </label>
              <select
                id="ciclo"
                name="ciclo"
                value={formData.ciclo}
                onChange={handleChange}
                className={`dark-input w-full px-4 py-3 rounded-xl cursor-pointer ${
                  errors.ciclo ? 'border-red-500/50' : ''
                }`}
              >
                <option value="">Selecciona un cicle</option>
                {CICLOS.map(ciclo => (
                  <option key={ciclo} value={ciclo}>{ciclo}</option>
                ))}
              </select>
              {errors.ciclo && <p className="text-red-400 text-sm mt-2">{errors.ciclo}</p>}
            </div>

            {/* URL Imagen */}
            <div>
              <label htmlFor="urlImagen" className="block text-sm font-medium text-white/60 mb-2">
                URL de la imatge *
              </label>
              <input
                type="url"
                id="urlImagen"
                name="urlImagen"
                value={formData.urlImagen}
                onChange={handleChange}
                placeholder="https://..."
                className={`dark-input w-full px-4 py-3 rounded-xl ${
                  errors.urlImagen ? 'border-red-500/50' : ''
                }`}
              />
              {errors.urlImagen && <p className="text-red-400 text-sm mt-2">{errors.urlImagen}</p>}
            </div>

            {/* Vista previa de la imagen */}
            {formData.urlImagen && (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 blur-lg opacity-50"></div>
                  <img
                    src={formData.urlImagen}
                    alt="Vista prèvia"
                    className="relative w-24 h-24 rounded-full object-cover ring-2 ring-white/20"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              </div>
            )}

            {/* Botones */}
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
                {alumno ? 'Guardar canvis' : 'Crear alumne'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioAlumno;
