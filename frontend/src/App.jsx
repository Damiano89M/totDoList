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
import Mytodos from './features/todos/MyTodos';
import Register from './pages/Register';

//router and Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/lists' element={<MyList/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/lists/:list_id/edit' element={<ListEdit/>} />
      <Route path='/lists/:list_id/todos' element={<Mytodos />} />
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
