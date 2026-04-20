import { Routes, Route } from 'react-router-dom';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import ProfilePage from './pages/user/ProfilePage';
import CHome from './pages/customer/CHome';
import PHome from './pages/producer/PHome';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Завантаження...</div>;

  return (
    <div className="App">
      <Navbar />

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/*" element={user?.is_producer_mode ? <PHome /> : <CHome />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;