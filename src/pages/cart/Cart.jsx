import {React,useEffect} from 'react'
import './cart.scss'
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {setCart,updateCart,deleteCart} from '../../store/slice/cartSlice'
const Cart = () => {
  const {products,total} = useSelector(state => state.cart); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  console.log(navigate.parameter)
  useEffect(()=>{
     const data = JSON.parse(localStorage.getItem('cart'));
     if(data !== null){
         dispatch(setCart(data))
     }
  },[dispatch])

  let filterProducts = [...products]; 
  const handleClick = (type,indexs,productId)=>{
      if(type === "decrement"){
            let product = filterProducts.find((item,index)=>index === indexs);
            filterProducts = [...filterProducts.slice(0,indexs),{...product,quantity: product.quantity > 1 ? product.quantity - 1 : 1 },...filterProducts.slice(indexs + 1)]; 
        }else{
          let product = filterProducts.find((item,index) => index === indexs);
          filterProducts = [...filterProducts.slice(0, indexs), { ...product, quantity: product.quantity + 1 }, ...filterProducts.slice(indexs + 1)]; 
      }
      dispatch(updateCart(filterProducts))
  }

  const handleRemoveCart = (indexs)=>{
        const filterProductsRemove = filterProducts.filter((item,index)=>index !== indexs);  
        dispatch(deleteCart(filterProductsRemove)); 
  }
  const handleCartNextStep = ()=>{
        const user = JSON.parse(localStorage.getItem('user')); 
        if(!user){
            navigate({
                pathname:'/login', 
                search: '?from=Cart',
            });
        }else{
            navigate('/address'); 
        }
  }
  return (
    <div className='cart-container'>
        <div className='cart-wraper'>
            <h1>Your Cart</h1>
            <div className='cart-main'>
                <div className='cart-main-left'>
                    {
                        products.length ?
                               products.map((item,index)=>{
                           return <div key={index} className='cart-item'>
                              <img src={item.image} alt="" />
                              <div className='cart-item-info'>
                                  <span>{item.name}</span>
                                  <span>{item.desc}</span>
                                  <div style={{"backgroundColor":`${item.color}`}}></div>
                                  <span>Price:<span style={{ "color": "red" }}>{item.price}</span></span>
                              </div>
                              <div className='cart-item-quantity'>
                                  <div onClick={()=>handleClick("decrement",index,item._id)}>-</div>
                                  <div>{item.quantity}</div>
                                  <div onClick={()=>handleClick("increment",index,item._id)}>+</div>
                              </div>
                              <div onClick={()=>handleRemoveCart(index)} className='cart-clear-icon'>
                                  <ClearIcon />
                              </div>
                          </div>
                          }):<h2>Your Cart Is Empty !</h2>
                          
                    }
                                        
                </div>
                <div className='cart-main-right'>
                    <h3>Resume</h3>
                    <ul>
                        <li>Subtotal:0$</li>
                        <li>Fee Shipping:0$</li>
                        <li>Tax:0$</li>
                          <li>Total:<mark>{total}$</mark></li>
                    </ul>
                      <button onClick={handleCartNextStep}>Address Shipping</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart