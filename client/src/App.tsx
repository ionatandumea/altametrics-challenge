import { Link, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Invoices from './pages/invoices';

export const App = () => {
  return (
    <div className="p-6">
      <nav className="mb-6 flex gap-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<Invoices />} />
      </Routes>
    </div>
  );
};
