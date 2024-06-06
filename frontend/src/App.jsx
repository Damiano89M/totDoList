import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

//layout and pages
import Layout from './components/layout';
import HomePage from './pages/HomePage';
import MyList from './features/lists/MyList';
import ListEdit from './features/lists/ListEdit';
import MyTodos from './features/todos/MyTodos';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import PrivateRoute from './components/PrivateRoute';

//router and Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/lists' element={<PrivateRoute><MyList /></PrivateRoute>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<PrivateRoute><Logout /></PrivateRoute>} />
      <Route path='/lists/:list_id/edit' element={<PrivateRoute><ListEdit /></PrivateRoute>} />
      <Route path='/lists/:list_id/todos' element={<PrivateRoute><MyTodos /></PrivateRoute>} />
      <Route index element={<HomePage />} />
    </Route>
  )
)
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
