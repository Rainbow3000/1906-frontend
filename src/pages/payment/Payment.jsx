import {React,useEffect,useState} from 'react'
import './payment.scss'
import AddressStage from '../../components/addressStage/AddressStage'
import PaypalCheckoutButton from '../../components/paypalCheckoutButton/PaypalCheckoutButton'
import {useSelector,useDispatch } from 'react-redux'
import {updateAddress} from '../../store/slice/addressSlice'; 
import {createOrderUser,createOrderEnd} from '../../store/slice/orderSlice'
import { useNavigate,Link } from 'react-router-dom'
import { clearCart } from '../../store/slice/cartSlice';
import moment from 'moment';
const Payment = () => {
  const dispatch = useDispatch(); 
  const {products,total} = useSelector(state=>state.cart);  
  const {addressUser} = useSelector(state=>state.address); 
  const {user} = useSelector (state=>state.user);  
  const [payMethod,setPayMethod] = useState("payOnline"); 
  const { isOrderSuccess } = useSelector(state=>state.order);
  const navigate = useNavigate();
  useEffect(()=>{
      const addressUser = JSON.parse(localStorage.getItem('address-user')); 
      if(addressUser){
        const { address, phone, city, national } = addressUser;
        const userAddress = {
          address, phone, city, national
        }
        dispatch(updateAddress({ userAddress: userAddress })) 
      }
  },[])
  if(!user){
    navigate('/login'); 
  }
  if (products === []){
    navigate('/')
  }

  if (addressUser.phone === "" || addressUser.address === "" || addressUser.city === ""){
    navigate('/address'); 
  }

  const handleRadioClick = (e)=>{
        setPayMethod(e.target.value)
  }
  const filterProducts = products.map(item => {
    return {productDesc: item.desc,productName: item.name,productId: item._id, quantity: item.quantity, total: item.quantity * item.price, size: item.size, color: item.color,image:item.image[0] }
  })

  const handleOrderOffline = ()=>{
    const {address, phone} = addressUser;
       const order = {
           userId: user._id,
           userName: user.userName,
           email:user.email,
           product: [...filterProducts],
           totalOrder: total,
           phone: phone,
           address: address,
           methodPay: "Receive and Pay",
           isPaid: false,
           isDelivered: false,
           deliveredAt: "",
           paidAt:"",
           orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
           resultOrder: "pending"
       }
       console.log(order);
       dispatch(createOrderUser({order}));
  }

  if (isOrderSuccess) {
    dispatch(clearCart());
    dispatch(createOrderEnd());
    alert('You order success ! Tks');
    navigate('/');
  }
  return (
    <div className='payment-container'>
            <AddressStage addressStep="address" checkoutStep="payment"/>
        <div className="payment-wraper">
            <Link to="/cart" className='btn-payment-back'>Back</Link>
            <div>
                <div className='payment-list-order'>
                      <h2>Your Order</h2>
                      <div className="payment-delimiter"></div>
                      {products.map(item=>{
                        return <div className='payment-list-product'>
                            <img alt='' src={item.image} />
                            <div className='payment-list-info'>
                                <h1>{item.name}</h1>
                            <span style={{ color: 'black', fontWeight: 'bold' }} className='payment-list-info-des'>{item.desc}</span>
                                <span style={{color:'black',fontWeight:'bold'}}>Price : <b>{item.price}$</b></span>
                            <span style={{ color: 'black', fontWeight: 'bold' }}>Quantity: x{item.quantity}</span>
                                <div className='payment-list-info-tail'>
                                        <div style={{backgroundColor:`${item.color}`}} className='payment-list-info-color'></div>
                              <div className='payment-list-total'><span style={{fontSize:25}}>Total: {item.quantity * item.price}$</span></div>
                                </div>
                            </div>
                        </div>  
                      })}                   
                     
                </div>
                <div className='payment-sumary-payment'>                       
                      <span className='payment-sumary-payment-title'>Sumary Payment</span>
                    <div>
                        <ul>
                <li><b>Address:</b><span style={{ color: 'gray'}}>{addressUser.address}</span></li>
                <li style={{marginTop:10}}><b>Phone:</b><span style={{ color: 'gray'}}>{addressUser.phone}</span></li>
                <li style={{marginTop:10}}><b>City:</b><span style={{ color: 'gray'}}>{addressUser.city}</span></li>
                        </ul>
                        <div className='payment-sumary-delimiter'></div>
                    </div>
            <span className='payment-sumary-payment-total'>Total Pay:<mark>{total}$</mark></span>
            <div className='payment-sumary-delimiter'></div>
                      <div className="payment-sumary-options-pay-order">
                          <span>Choose order method:</span>
                            
                                <div className='payment-sumary-option-pay-item'>
                                  <input onClick ={(e)=>handleRadioClick(e)} id="Ponline" type="radio" name='pay-order' defaultChecked value="payOnline"/>
                                  <label htmlFor='Ponline'>Pay online</label>                                
                                </div>
                                <div className='payment-sumary-option-pay-item'>
                                <input onClick={(e) => handleRadioClick(e)}  id='RandP' type="radio" name='pay-order' value="receiveAndPay" />
                                  <label htmlFor='RandP'>Receive and Pay</label>
                                </div>
                                                   
                      </div>
            <div className='payment-sumary-delimiter'></div>
                      {
                        payMethod === "payOnline"?(
                          <div className='paypal-button-checkout'>
                            <PaypalCheckoutButton user={user} addressUser={addressUser} products={products} totalPay={total} />
                          </div>
                        ):(
                          <button className='btn-receive-and-pay' onClick={handleOrderOffline}>
                                Order Now
                          </button>
                        )
                      }
                      
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment