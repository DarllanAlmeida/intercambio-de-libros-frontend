import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Intercambios from "./pages/Intercambios";
import Login from "./pages/Login";
import Register from "./pages/Register";

import api from "./api";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/libro")
        .then((res) => setBooks(res.data))
        .catch((err) => console.error("Error al obtener libros:", err));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Home books={books} setBooks={setBooks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agregar"
          element={
            <ProtectedRoute>
              <AddBook books={books} setBooks={setBooks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <ProtectedRoute>
              <EditBook books={books} setBooks={setBooks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/intercambio"
          element={
            <ProtectedRoute>
              <Intercambios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
