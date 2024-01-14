import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index lazy={() => import("./pages/Main")} />
      <Route path="weather" lazy={() => import("./pages/Weather")} />
      <Route path="auth" lazy={() => import("./components/AuthLayout")}>
        <Route index lazy={() => import("./pages/SignIn")} />
        <Route path='signup' lazy={() => import("./pages/SignUp")} />
      </Route>
      <Route path="user" lazy={() => import("./components/Protected")}>
        <Route index lazy={() => import("./pages/User")} />
      </Route>
      <Route path="*" lazy={() => import("./pages/NotFound")} />
    </Route>
  )
);


function App() {
  return (
    <RouterProvider 
      router={router}
      fallbackElement={<Loader />}
    />
  )
}

export default App