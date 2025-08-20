import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api"; // ajuste conforme seu caminho real
import { toast } from "react-toastify";

function AddBook() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !autor || !genero) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/libros", { titulo, autor, genero, estado });
      toast.success("Libro agregado con éxito!");
      navigate("/");
    } catch (error) {
      toast.error("Error al agregar el libro");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Libro</h2>
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
          {loading ? "Agregando..." : "Agregar"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
