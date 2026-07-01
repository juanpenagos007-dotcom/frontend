import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      <main className="flex-grow-1 p-3">
        {children}
      </main>

    </div>
  );
}