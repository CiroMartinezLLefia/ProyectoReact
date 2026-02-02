function SelectorPromocion({ promociones, promocionSeleccionada, onPromocionChange }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="promocion" className="text-white/40 font-medium whitespace-nowrap text-sm hidden sm:block">
        Promoció
      </label>
      <select
        id="promocion"
        value={promocionSeleccionada}
        onChange={(e) => onPromocionChange(e.target.value)}
        className="dark-input w-full sm:w-auto px-4 py-2.5 rounded-xl cursor-pointer"
      >
        <option value="">Totes les promocions</option>
        {promociones.map((promo) => (
          <option key={promo} value={promo}>
            {promo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorPromocion;
