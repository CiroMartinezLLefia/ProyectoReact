import { useState, useEffect } from 'react';
import { alumnosService, authService } from './services/alumnosService';
import SelectorPromocion from './components/SelectorPromocion';
import SelectorGrupo from './components/SelectorGrupo';
import FiltroNombre from './components/FiltroNombre';
import Alumno from './components/Alumno';
import Avatar from './components/Avatar';
import FormularioAlumno from './components/FormularioAlumno';
import Login from './components/Login';
import InfoAdmin from './components/InfoAdmin';
import './App.css';

function App() {
  // Estados para datos de alumnos
  const [alumnos, setAlumnos] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [ciclos, setCiclos] = useState([]);

  // Estados para filtros
  const [promocion, setPromocion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');

  // Estados para autenticación
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Estados para el formulario
  const [showFormulario, setShowFormulario] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);

  // Estado para confirmación de eliminación
  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    cargarAlumnos();
    cargarAuth();
  }, []);

  const cargarAlumnos = async () => {
    const data = await alumnosService.getAll();
    if (data) {
      setAlumnos(data);
      actualizarPromociones(data);
    }
  };

  const actualizarPromociones = (data) => {
    const promos = [...new Set(data.map(a => a.promocion))].sort().reverse();
    setPromociones(promos);
    const grupos = [...new Set(data.map(a => a.ciclo))].sort();
    setCiclos(grupos);
  };

  const cargarAuth = () => {
    const authState = authService.getAuthState();
    setUsuarioLogueado(authState.usuarioLogueado);
    setEsAdmin(authState.esAdmin);
    setUsuario(authState.usuario);
  };

  // Funciones de autenticación
  const handleLogin = (usuario, password) => {
    const result = authService.login(usuario, password);
    if (result) {
      setUsuarioLogueado(result.usuarioLogueado);
      setEsAdmin(result.esAdmin);
      setUsuario(result.usuario);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    authService.logout();
    setUsuarioLogueado(false);
    setEsAdmin(false);
    setUsuario(null);
  };

  // Funciones CRUD
  const crearAlumno = async (datos) => {
    await alumnosService.create(datos);
    await cargarAlumnos();
    setShowFormulario(false);
  };

  const editarAlumno = async (datos) => {
    if (alumnoEditando) {
      await alumnosService.update(alumnoEditando.id, datos);
      await cargarAlumnos();
      setShowFormulario(false);
      setAlumnoEditando(null);
    }
  };

  const eliminarAlumno = async (id) => {
    await alumnosService.delete(id);
    await cargarAlumnos();
    setAlumnoAEliminar(null);
  };

  // Funciones para gestión del formulario
  const abrirFormularioCrear = () => {
    setAlumnoEditando(null);
    setShowFormulario(true);
  };

  const abrirFormularioEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setShowFormulario(true);
  };

  const cerrarFormulario = () => {
    setShowFormulario(false);
    setAlumnoEditando(null);
  };

  const handleSubmitFormulario = (datos) => {
    if (alumnoEditando) {
      editarAlumno(datos);
    } else {
      crearAlumno(datos);
    }
  };

  // Filtrar alumnos
  const alumnosFiltrados = alumnos.filter(alumno => {
    // Filtro por promoción
    const cumplePromocion = !promocion || alumno.promocion === promocion;
    
    // Filtro por ciclo (grupo)
    const cumpleCiclo = !ciclo || alumno.ciclo === ciclo;
    
    // Filtro por nombre/apellidos (case-insensitive)
    const textoBusqueda = filtroNombre.toLowerCase();
    const cumpleNombre = !filtroNombre || 
      alumno.nombre.toLowerCase().includes(textoBusqueda) ||
      alumno.apellidos.toLowerCase().includes(textoBusqueda);
    
    return cumplePromocion && cumpleCiclo && cumpleNombre;
  });

  return (
    <div className="app-bg min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-lg shadow-violet-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
                  Gestió d'Alumnes
                </h1>
                <p className="text-white/40 text-sm mt-0.5">Sistema de gestió acadèmica</p>
              </div>
            </div>
            <InfoAdmin
              usuario={usuarioLogueado ? usuario : null}
              onLogout={handleLogout}
              onLoginClick={() => setShowLogin(true)}
            />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:px-12">
        {/* Barra de filtros */}
        <div className="glass-card rounded-3xl p-6 mb-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full xl:w-auto">
              <SelectorPromocion
                promociones={promociones}
                promocionSeleccionada={promocion}
                onPromocionChange={setPromocion}
              />
              <SelectorGrupo
                grupos={ciclos}
                grupoSeleccionado={ciclo}
                onGrupoChange={setCiclo}
              />
              <FiltroNombre
                filtro={filtroNombre}
                onFiltroChange={setFiltroNombre}
              />
            </div>
            
            {esAdmin && (
              <button
                onClick={abrirFormularioCrear}
                className="btn-glow w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nou Alumne
              </button>
            )}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl font-bold gradient-text">{alumnosFiltrados.length}</span>
            <span className="text-white/50">de {alumnos.length} alumnes</span>
          </div>
        </div>

        {/* Grid de alumnos */}
        {alumnosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alumnosFiltrados.map(alumno => (
              <Alumno
                key={alumno.id}
                nombre={alumno.nombre}
                apellidos={alumno.apellidos}
                promo={alumno.promocion}
                ciclo={alumno.ciclo}
                esAdmin={esAdmin}
                onEdit={() => abrirFormularioEditar(alumno)}
                onDelete={() => setAlumnoAEliminar(alumno)}
              >
                <Avatar urlImagen={alumno.urlImagen} nombre={alumno.nombre} />
              </Alumno>
            ))}
          </div>
        ) : (
          <div className="glass-card text-center py-20 rounded-3xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-white/70 text-xl font-medium">No s'han trobat alumnes</p>
            <p className="text-white/40 text-sm mt-2">Prova amb altres filtres de cerca</p>
          </div>
        )}
      </main>

      {/* Modal de Login */}
      {showLogin && (
        <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

      {/* Modal de Formulario */}
      {showFormulario && (
        <FormularioAlumno
          alumno={alumnoEditando}
          onSubmit={handleSubmitFormulario}
          onCancel={cerrarFormulario}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {alumnoAEliminar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl w-full max-w-md p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Eliminar alumne?</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Estàs segur que vols eliminar a <span className="font-semibold text-white">{alumnoAEliminar.nombre} {alumnoAEliminar.apellidos}</span>? Aquesta acció no es pot desfer.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setAlumnoAEliminar(null)}
                  className="flex-1 px-6 py-3 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  Cancel·lar
                </button>
                <button
                  onClick={() => eliminarAlumno(alumnoAEliminar.id)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium rounded-2xl hover:from-red-400 hover:to-rose-400 transition-all shadow-lg shadow-red-500/30"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
