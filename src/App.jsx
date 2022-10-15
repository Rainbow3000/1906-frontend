import {React} from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Cart from './pages/cart/Cart'
import Home from './pages/home/Home'
import SingleProduct from './pages/singleProduct/SingleProduct'
import NavbarInfo from './components/navbarInfo/NavbarInfo'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Address from './pages/address/Address'
import Payment from './pages/payment/Payment'
import NotFound from './pages/notFound/NotFound'
import Success from './pages/success/Success'
import User from './pages/user/User'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const App = () => { 
  return (
    <PayPalScriptProvider options={{ "client-id":process.env.REACT_APP_PAYPAL_PUBLIC_KEY}}>
        <div className='app-container'>
            <BrowserRouter>
                <Navbar />
                <NavbarInfo/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/single/:id' element={<SingleProduct />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/address' element={<Address/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                    <Route path='/success' element={<Success/>}/>
                    <Route path='/me' element={<User/>}/>
                    <Route path="*" element={<NotFound/>} />
                </Routes>            
                <Footer/>
            </BrowserRouter>
        </div>
    </PayPalScriptProvider>
  )
}

export default App