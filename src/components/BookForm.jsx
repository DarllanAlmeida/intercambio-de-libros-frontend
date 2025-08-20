import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookForm = ({ initialData = {}, onSubmit }) => {
  const [titulo, setTitulo] = useState(initialData.titulo || "");
  const [autor, setAutor] = useState(initialData.autor || "");
  const [estado, setEstado] = useState(initialData.estado || "disponible");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, autor, estado });
    navigate("/"); // volver a la lista de libros
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="disponible">Disponible</option>
          <option value="intercambiado">Intercambiado</option>
          <option value="reservado">Reservado</option>
        </select>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default BookForm;