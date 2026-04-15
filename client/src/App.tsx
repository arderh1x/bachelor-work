import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Завантаження...</div>;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="App">
      <nav style={{ padding: '1rem', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/">Головна</Link>

        {!user ? (
          <>
            <Link to="/login">Увійти</Link>
            <Link to="/register">Реєстрація</Link>
          </>
        ) : (
          <>
            <span>Вітаємо, <strong>{user.username || user.email}</strong>!</span>
            {user.role === 'producer' && <span style={{ color: 'gold' }}> [Виробник]</span>}
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Вийти</button>
          </>
        )}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<h1>Вітрина меблів</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;