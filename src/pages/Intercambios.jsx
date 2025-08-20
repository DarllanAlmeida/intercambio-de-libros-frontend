import React, { useEffect, useState } from 'react';
import axios from '../api';
// import './Intercambios.css'; // Puedes descomentar cuando el CSS esté listo

const Intercambios = () => {
  const [intercambios, setIntercambios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntercambios = async () => {
      try {
        const res = await axios.get('/intercambios');
        setIntercambios(res.data);
      } catch (error) {
        console.error('Error al cargar intercambios', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntercambios();
  }, []);

  const actualizarEstado = async (id, accion) => {
    try {
      await axios.patch(`/intercambios/${id}/${accion}`);
      const nuevos = intercambios.map((item) =>
        item.id === id ? { ...item, estado: accion === 'aceptar' ? 'aceptado' : 'rechazado' } : item
      );
      setIntercambios(nuevos);
    } catch (error) {
      console.error('Error actualizando estado', error);
    }
  };

  if (loading) return <p>Cargando intercambios...</p>;
  if (intercambios.length === 0) return <p>No hay intercambios.</p>;

  return (
    <div
      className="intercambios-container"
      style={{
        backgroundColor: '#222',
        color: '#eee',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '40px auto',
        fontFamily: 'Arial, sans-serif',
        border: '3px solid #f39c12',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#f39c12', marginBottom: '30px' }}>Lista de Intercambios</h2>
      {intercambios.map((intercambio) => (
        <div
          key={intercambio.id}
          className="intercambio-card"
          style={{
            backgroundColor: '#444',
            border: '2px solid #f39c12',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            boxShadow: '0 0 10px #f39c12',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#f39c12', fontSize: '1.1rem' }}>Libro Ofrecido:</strong>{' '}
            {intercambio.libroOfrecido.titulo} - {intercambio.libroOfrecido.autor} ({intercambio.libroOfrecido.estado})
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#f39c12', fontSize: '1.1rem' }}>Libro Solicitado:</strong>{' '}
            {intercambio.libroSolicitado.titulo} - {intercambio.libroSolicitado.autor} ({intercambio.libroSolicitado.estado})
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Estado:</strong> {intercambio.estado}
          </div>

          {intercambio.estado === 'pendiente' && (
            <div>
              <button
                onClick={() => actualizarEstado(intercambio.id, 'aceptar')}
                style={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  padding: '10px 18px',
                  marginRight: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Aceptar
              </button>
              <button
                onClick={() => actualizarEstado(intercambio.id, 'rechazar')}
                style={{
                  backgroundColor: '#c0392b',
                  color: 'white',
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Rechazar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Intercambios;