import './App.css';
import '@master/css';
import Navbar from './components/navbar';
import Home from './components/homePage';
import List from './components/list';
import Login from './components/logIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from './components/cart';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:slug' element={<List />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
