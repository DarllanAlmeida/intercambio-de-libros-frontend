import React, { useState, useEffect } from 'react';
import axios from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Intercambios.css';

const Intercambios = () => {
  const [intercambios, setIntercambios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntercambios();
  }, []);

  const fetchIntercambios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/intercambios');
      setIntercambios(response.data);
    } catch (error) {
      toast.error('Error al cargar intercambios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.patch(`/intercambios/${id}/aceptar`);
      setIntercambios(intercambios.map(item => 
        item.id === id ? { ...item, estado: 'aceptado' } : item
      ));
      toast.success('Intercambio aceptado');
    } catch (error) {
      toast.error('Error al aceptar el intercambio');
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/intercambios/${id}/rechazar`);
      setIntercambios(intercambios.map(item => 
        item.id === id ? { ...item, estado: 'rechazado' } : item
      ));
      toast.success('Intercambio rechazado');
    } catch (error) {
      toast.error('Error al rechazar el intercambio');
      console.error(error);
    }
  };

  return (
    <div className="intercambios-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="intercambios-title">🔄 Intercambios</h2>

      {loading ? (
        <p className="loading">Cargando intercambios...</p>
      ) : intercambios.length === 0 ? (
        <p className="no-intercambios">No hay intercambios activos.</p>
      ) : (
        <ul className="intercambio-list">
          {intercambios.map(intercambio => (
            <li key={intercambio.id} className="intercambio-card">
              <div className="intercambio-info">
                <p className="intercambio-book"><strong>Libro Ofrecido:</strong> {intercambio.libroOfrecido.titulo}</p>
                <p className="intercambio-book"><strong>Libro Solicitado:</strong> {intercambio.libroSolicitado.titulo}</p>
                <p className="intercambio-user"><strong>Solicitado por:</strong> {intercambio.libroSolicitado.usuario?.nombre || 'Desconocido'}</p>
                <p className={`intercambio-status ${intercambio.estado.toLowerCase()}`}>Estado: {intercambio.estado}</p>
              </div>
              <div className="card-buttons">
                {intercambio.estado === 'pendiente' && (
                  <>
                    <button className="accept-btn" onClick={() => handleAccept(intercambio.id)}>Aceptar</button>
                    <button className="reject-btn" onClick={() => handleReject(intercambio.id)}>Rechazar</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Intercambios;