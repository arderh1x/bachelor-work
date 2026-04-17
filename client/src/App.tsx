import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import CApp from './pages/customer/CApp';
import PApp from './pages/producer/PApp';
import Navbar from './components/Navbar';

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

          <Route path="/*" element={user?.is_producer_mode ? <PApp /> : <CApp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;