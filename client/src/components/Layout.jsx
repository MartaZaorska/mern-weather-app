import { useEffect } from 'react';
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux';

import { useGetProfileQuery } from '../app/apiUser';
import { setUser } from '../app/appSlice';

import Header from './Header';

function Layout(){
  const dispatch = useDispatch();
  const { data } = useGetProfileQuery();

  useEffect(() => {
    if(data){
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout;