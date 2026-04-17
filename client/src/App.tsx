import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Завантаження...</div>;

  return (
    <div className="App">
      <Navbar />

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={
            user?.is_producer_mode ? (
              <section>
                <h1>Панель виробника</h1>
                <p>Тут ви можете керувати своїми товарами та переглядати замовлення з форуму.</p>
              </section>
            ) : (
              <section>
                <h1>Вітрина меблів</h1>
                <p>Знайдіть готові меблі або залиште запит на форумі.</p>
              </section>
            )
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;