import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Component(){
  const { user } = useSelector(state => state.app);

  if(user) return <Navigate to="/" />

  return <Outlet />
}

Component.displayName = "AuthLayout";