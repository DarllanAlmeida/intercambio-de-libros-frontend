import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api"; // ajusta la ruta
import { toast } from "react-toastify";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // Cargar datos del libro desde backend
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/libros/${id}`);
        const book = response.data;
        setTitulo(book.titulo);
        setAutor(book.autor);
        setGenero(book.genero);
        setEstado(book.estado);
      } catch (error) {
        toast.error("No se pudo cargar el libro");
      } finally {
        setLoadingData(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !autor || !genero) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`/libros/${id}`, { titulo, autor, genero, estado });
      toast.success("Libro actualizado correctamente");
      navigate("/");
    } catch (error) {
      toast.error("Error al actualizar el libro");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <p>Cargando libro...</p>;

  return (
    <div className="form-container">
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="disponible">Disponible</option>
          <option value="intercambiado">Intercambiado</option>
          <option value="reservado">Reservado</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}

export default EditBook;