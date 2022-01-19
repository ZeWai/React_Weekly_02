import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login'
import Signup from './Login/Signup/Signup'
import Todolist from './ToDoList/Todolist';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";;

function RequireAuth({ children }) {
  let auth = useSelector((state) => state.authStore.auth);
  return auth ? children : <Navigate to='/login' />;
}

function NotRequireAuth({ children }) {
  let auth = useSelector((state) => state.authStore.auth);
  return auth ? <Navigate to='/' /> : children;
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/todolists' />} />
          <Route path='/todolists' element={<RequireAuth><Todolist /></RequireAuth>} />
          <Route path='/signup' element={<NotRequireAuth><Signup /></NotRequireAuth>} />
          <Route path='/login' element={<NotRequireAuth><Login /></NotRequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
