import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Datos de prueba por ahora
    setLibros([
      { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", estado: "disponible" },
      { id: 2, titulo: "1984", autor: "George Orwell", estado: "intercambiado" }
    ]);
  }, []);

  return (
    <div>
      <h1>Lista de Libros</h1>
      <Link to="/add">Agregar Libro</Link>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            {libro.titulo} - {libro.autor} - {libro.estado} {" "}
            <Link to={`/edit/${libro.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;