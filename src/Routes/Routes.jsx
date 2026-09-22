import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../Layout/MainLayOut';
import Home from '../Home/Home';
import AdminLayout from '../Admin/AdminLayout';
import AdminLogin from '../Admin/AdminLogin';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayOut />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
]);

export default Routes;