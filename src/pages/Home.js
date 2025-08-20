import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Usuario'); // 👈 simulación nombre usuario
  const [intercambiosCount, setIntercambiosCount] = useState(0);

  useEffect(() => {
    // Simulación: podrías traer el nombre del usuario desde el backend o JWT
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);

    fetchBooks();
    fetchIntercambios();
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

  const fetchIntercambios = async () => {
    try {
      const response = await axios.get('/intercambios');
      setIntercambiosCount(response.data.length);
    } catch (error) {
      console.error('Error al cargar intercambios', error);
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
    <div className="home-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 👋 Bienvenida personalizada */}
      <h2 className="welcome-msg">Hola! 👋</h2>
      <p className="welcome-sub">Administra tus libros y gestiona intercambios fácilmente.</p>

      {/* 🔹 Resumen de estadísticas */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{books.length}</h3>
          <p>Total Libros</p>
        </div>
        <div className="stat-card">
          <h3>{intercambiosCount}</h3>
          <p>Intercambios Activos</p>
        </div>
      </div>

      {/* 🔹 Botones principales */}
      <div className="home-actions">
        <Link to="/agregar" className="add-book-btn">➕ Agregar Libro</Link>
        <Link to="/intercambios" className="exchange-btn">🔄 Ver Intercambios</Link>
      </div>

      {/* 🔹 Barra de búsqueda */}
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

      {/* 🔹 Lista de libros */}
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
                <p className={`book-status ${book.estado.toLowerCase()}`}>
                  {book.estado}
                </p>
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
  );
};

export default Home;