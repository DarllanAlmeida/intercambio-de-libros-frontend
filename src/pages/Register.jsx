import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      return setError("Las contraseñas no coinciden");
    }

    try {
      await axios.post("/auth/register", { email, password });
      alert("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      setError("Error al registrarse");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;