import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const profile = localStorage.getItem('profile');

  if (!profile) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(profile);

  if (user.result.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
