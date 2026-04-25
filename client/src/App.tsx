import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import ProducerDetailsPage from './pages/ProducerDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import FAQPage from './pages/FAQPage';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* Публічні маршрути */}
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* Захищені маршрути */}
      <Route element={user ? <AppLayout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/producer/:id" element={<ProducerDetailsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {user?.is_producer_mode && (
          <>
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/orders" element={<OrdersPage mode="producer" />} />
          </>
        )}

        {!user?.is_producer_mode && (
          <>
            <Route path="/orders" element={<OrdersPage mode="customer" />} />
          </>
        )}

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;