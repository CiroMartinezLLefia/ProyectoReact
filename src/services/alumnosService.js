import alumnosData from '../data/alumnos.json';

const STORAGE_KEY = 'alumnos_data';
const AUTH_KEY = 'auth_data';

// Usuario admin por defecto
const ADMIN_USER = {
  usuario: 'admin',
  password: 'admin123',
  esAdmin: true
};

export const alumnosService = {
  // Obtener todos los alumnos
  getAll: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Si no hay datos en localStorage, cargar desde JSON inicial
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnosData));
    return alumnosData;
  },

  // Guardar todos los alumnos
  saveAll: (alumnos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
    return alumnos;
  },

  // Crear un nuevo alumno
  create: (alumno) => {
    const alumnos = alumnosService.getAll();
    const newId = alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1;
    const newAlumno = { ...alumno, id: newId };
    const updatedAlumnos = [...alumnos, newAlumno];
    alumnosService.saveAll(updatedAlumnos);
    return newAlumno;
  },

  // Actualizar un alumno existente
  update: (id, datos) => {
    const alumnos = alumnosService.getAll();
    const index = alumnos.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    const updatedAlumno = { ...alumnos[index], ...datos };
    alumnos[index] = updatedAlumno;
    alumnosService.saveAll(alumnos);
    return updatedAlumno;
  },

  // Eliminar un alumno
  delete: (id) => {
    const alumnos = alumnosService.getAll();
    const filteredAlumnos = alumnos.filter(a => a.id !== id);
    alumnosService.saveAll(filteredAlumnos);
    return filteredAlumnos;
  },

  // Obtener promociones únicas
  getPromociones: () => {
    const alumnos = alumnosService.getAll();
    const promociones = [...new Set(alumnos.map(a => a.promocion))];
    return promociones.sort().reverse();
  }
};

export const authService = {
  // Iniciar sesión
  login: (usuario, password) => {
    if (usuario === ADMIN_USER.usuario && password === ADMIN_USER.password) {
      const authData = {
        usuarioLogueado: true,
        esAdmin: true,
        usuario: usuario
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      return authData;
    }
    return null;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    return { usuarioLogueado: false, esAdmin: false, usuario: null };
  },

  // Obtener estado de autenticación
  getAuthState: () => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { usuarioLogueado: false, esAdmin: false, usuario: null };
  }
};
