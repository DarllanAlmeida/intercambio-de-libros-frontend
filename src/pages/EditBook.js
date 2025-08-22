import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    estado: 'disponible',
  });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/libro/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error cargando libro:', error);
      toast.error('No se pudo cargar el libro');
      navigate('/inicio');
    }
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.patch(`/libro/${id}`, formData);
      toast.success('Libro actualizado con éxito!');
      navigate('/inicio');
    } catch (error) {
      console.error('Error actualizando libro:', error);
      toast.error('Error al actualizar el libro');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={handleChange} required />
        <input type="text" name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} required />
        <input type="text" name="genero" placeholder="Género" value={formData.genero} onChange={handleChange} />
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="disponible">Disponible</option>
          <option value="intercambiado">Intercambiado</option>
          <option value="reservado">Reservado</option>
        </select>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditBook;