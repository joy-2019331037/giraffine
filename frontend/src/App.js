import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";
import NotificationUpdates from "./components/NotificationUpdates/NotificationUpdates";
import Root from './pages/Landing/Root';
function App() {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const {pathname}=location;

  if(pathname==='/root')
    return <Root/>;
  
  return <>
  <Layout/>
  {user && <NotificationUpdates userId={user._id}/>}
  <ToastContainer />
  {}
  </>;
}

export default App;
