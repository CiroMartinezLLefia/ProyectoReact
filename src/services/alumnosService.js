const urlApi = 'https://backendmain1.vercel.app/api'

function formato(alumno) {
  return {
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    promocion: alumno.promo,
    ciclo: alumno.curso,
    urlImagen: alumno.url
  }
}

function fotmatoApi(apiAlumno) {
  return {
    id: apiAlumno._id,
    nombre: apiAlumno.nombre,
    apellidos: apiAlumno.apellidos,
    promo: apiAlumno.promocion,
    curso: apiAlumno.ciclo,
    url: apiAlumno.urlImagen
  }
}

export const alumnosService = {
  getAll: async () => {
    try {
      const res = await fetch(`${urlApi}/alumnos`)
      const data = await res.json()
      return (data || []).map(fotmatoApi)
    } catch (err) {
      console.error('getAll error', err)
    }
  },

  create: async (alumno) => {
    try {
      const res = await fetch(`${urlApi}/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formato(alumno))
      })
      const created = await res.json()
      return fotmatoApi(created)
    } catch (err) {
      console.error('create error', err)
    }
  },

  update: async (id, datos) => {
    try {
      const res = await fetch(`${urlApi}/alumnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formato(datos))
      })
      const updated = await res.json()
      return fotmatoApi(updated)
    } catch (err) {
      console.error('update error', err)

    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${urlApi}/alumnos/${id}`, { method: 'DELETE' })
      return true
    } catch (err) {
      console.error('delete error', err)

    }
  }
}

export const authService = {
  login: (usuario, password) => {
    if (usuario === 'admin' && password === 'admin123') {
      const state = { usuarioLogueado: true, esAdmin: true, usuario }
      localStorage.setItem('auth', JSON.stringify(state))
      return state
    }
    return null
  },

  logout: () => {
    localStorage.removeItem('auth')
  },

  getAuthState: () => {
    const raw = localStorage.getItem('auth')
    if (raw) {
      return JSON.parse(raw)
    }
    return { usuarioLogueado: false, esAdmin: false, usuario: null }
  }
}
