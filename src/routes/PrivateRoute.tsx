// PrivateRoute.tsx
import React, { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';

interface PrivateRouteProps {
  element: ReactElement;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Route 
      path={path} 
      element={user ? element : <Navigate to="/login" />} 
    />
  );
};

export default PrivateRoute;
