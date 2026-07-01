import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const nombre = localStorage.getItem("nombre");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("roles");

    navigate("/login");
  };

  const esAdmin = roles.includes("Administrador");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">

      <Link className="navbar-brand" to="/">
        Mi Sistema
      </Link>

      <div className="collapse navbar-collapse">

        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/productos">
              Productos
            </Link>
          </li>

          
          {esAdmin && (
            <li className="nav-item">
              <span className="nav-link text-warning">
                ADMIN
              </span>
            </li>
          )}

        </ul>

        <div className="d-flex align-items-center gap-3 text-white">

          <span>
            👤 {nombre || "Usuario"}
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={cerrarSesion}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}