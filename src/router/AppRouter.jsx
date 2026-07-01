import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Productos from "../pages/Productos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";

export default function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/productos"
        element={
          <MainLayout>
            <Productos />
          </MainLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

    </Routes>
  );
}