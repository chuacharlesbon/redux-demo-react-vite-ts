import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const user  = false; // logic;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
