import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header'; // ✅ Importar header
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, searchTitle, searchAuthor, searchGenre]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/libros');
      setBooks(response.data);
    } catch (error) {
      toast.error('Error al cargar libros');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este libro?')) return;
    try {
      await axios.delete(`/libros/${id}`);
      setBooks(books.filter(book => book.id !== id));
      toast.success('Libro eliminado con éxito!');
    } catch (error) {
      toast.error('Error al eliminar el libro');
      console.error(error);
    }
  };

  const applyFilters = () => {
    let result = books;
    if (searchTitle) {
      result = result.filter(book =>
        book.titulo.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (searchAuthor) {
      result = result.filter(book =>
        book.autor.toLowerCase().includes(searchAuthor.toLowerCase())
      );
    }
    if (searchGenre) {
      result = result.filter(book =>
        book.genero.toLowerCase().includes(searchGenre.toLowerCase())
      );
    }
    setFilteredBooks(result);
  };

  return (
    <div>
      <Header /> {/* ✅ Header con logout */}
      <div className="home-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="home-title">Mis Libros</h1>
        <Link to="/agregar" className="add-book-btn">Agregar Libro</Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por autor"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por género"
            value={searchGenre}
            onChange={(e) => setSearchGenre(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="loading">Cargando libros...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="no-books">No hay libros que coincidan</p>
        ) : (
          <ul className="book-list">
            {filteredBooks.map(book => (
              <li key={book.id} className="book-card">
                <div className="book-info">
                  <p className="book-title">{book.titulo}</p>
                  <p className="book-author">Autor: {book.autor}</p>
                  <p className="book-genre">Género: {book.genero}</p>
                  <p className={`book-status ${book.estado}`}>{book.estado}</p>
                </div>
                <div className="card-buttons">
                  <Link to={`/editar/${book.id}`} className="edit-btn">Editar</Link>
                  <button className="delete-btn" onClick={() => handleDelete(book.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;