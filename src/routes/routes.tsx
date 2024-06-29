// routes/routes.tsx
import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import Login from '../pages/Login/Login';
import { DashBoard } from '../components/Dashboard';

const Routes: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to="/login" />} />
    </RouterRoutes>
  );
};

export default Routes;
