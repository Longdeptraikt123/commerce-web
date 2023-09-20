import './App.css';
import '@master/css';
import Navbar from './components/navbar';
import Home from './components/homePage';
import List from './components/list';
import Login from './components/logIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from './components/cart';
import ShippingAddress from './components/shippingAddress';
import Logup from './components/logUp';
import Payment from './components/payment';
import Placeorder from './components/placeOrder'
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:slug' element={<List />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shipping' element={<ShippingAddress />} />
        <Route path='/logup' element={<Logup />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<Placeorder />} />

      </Routes>
    </Router>
  );
}

export default App;
