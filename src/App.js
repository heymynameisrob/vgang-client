import React, { useContext } from 'react';
import createRoutes from './Routes';
import Login from './views/LogIn';
import { useAuth } from './context/AuthProvider';

const routes = createRoutes();

function App() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? routes : <Login />
}

export default App;
