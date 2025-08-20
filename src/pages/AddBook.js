import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import './AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    estado: 'disponible',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/libros', formData);
      alert('Libro agregado con éxito!');
      navigate('/inicio');  // Redirigir a listado tras agregar
    } catch (error) {
      console.error('Error agregando libro:', error);
      alert('Error al agregar el libro');
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <input type="text" name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} required />
        <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} />
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="intercambiado">Intercambiado</option>
          <option value="reservado">Reservado</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddBook;