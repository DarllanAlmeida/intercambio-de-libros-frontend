import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Busca os livros no backend
    api.get("/libros")
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar livros:", err);
        setError("Erro ao buscar livros.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Livros</h1>
      <Link to="/add-book">
        <button>Adicionar Livro</button>
      </Link>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.genero}</td>
              <td>{book.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;