function Avatar({ urlImagen, nombre }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      <img
        src={urlImagen}
        alt={`Avatar de ${nombre || 'alumno'}`}
        className="relative w-24 h-24 rounded-full object-cover ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export default Avatar;
