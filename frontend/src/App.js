import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login'
import Signup from './Login/Signup/Signup'
import Todolist from './ToDoList/Todolist';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";;

function RequireAuth({ children }) {
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  return isAuthenticated ? children : <Navigate to='/login' />;
}

function NotRequireAuth({ children }) {
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  return isAuthenticated ? <Navigate to='/' /> : children;
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Todolist />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Todolist />} /> */}
          <Route path='/' element={<Navigate to='/todolist' />} />
          <Route path='/todolist' element={<RequireAuth><Todolist /></RequireAuth>} />
          <Route path='/signup' element={<NotRequireAuth><Signup /></NotRequireAuth>} />
          <Route path='/login' element={<NotRequireAuth><Login /></NotRequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
