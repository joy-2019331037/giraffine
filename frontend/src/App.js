import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";
import RatingUpdates from "./components/RatingUpdateNotification/RatingUpdate";

function App() {
  return <>
  <Layout/>
  <RatingUpdates/>
  <ToastContainer />
  </>;
}

export default App;
