import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            <div className="hero">

                <h1>Bienvenido a MarketPlus </h1>

                <p>

                    Compra productos de calidad al mejor precio.
                    Explora nuestro catálogo y encuentra todo lo que necesitas
                    en un solo lugar.

                </p>

                <button onClick={() => navigate("/productos")}>

                    Ver productos

                </button>

            </div>

        </div>

    );

}