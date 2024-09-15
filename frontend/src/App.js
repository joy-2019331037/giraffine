import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";
import NotificationUpdates from "./components/NotificationUpdates/NotificationUpdates";


function App() {
  const { user, dispatch } = useContext(AuthContext);
  return <>
  <Layout/>
  {user && <NotificationUpdates userId={user._id}/>}
  <ToastContainer />
  </>;
}

export default App;
