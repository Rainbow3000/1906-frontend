import {React,useEffect} from 'react'
import './address.scss'
import AddressStage from '../../components/addressStage/AddressStage'
import {useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {updateAddress} from '../../store/slice/addressSlice'
import { useForm } from 'react-hook-form'
const Address = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const {register,handleSubmit, formState:{errors} }  = useForm(); 
  const {user} = useSelector(state=>state.user); 
  useEffect(()=>{
      if(!user){
        navigate('/login')
      }
      const addressUser = JSON.parse(localStorage.getItem('address-user')); 
      if(addressUser){
        navigate('/payment'); 
      }
  },[])
    const onSubmit  = (data)=>{
        const {address,phone,city,national}  = data; 
        const userAddress = {
            address, phone, city, national
        }       
        dispatch(updateAddress({userAddress:userAddress}))
        navigate('/payment');
  }
  return (
    <div className='address-container'>
        <div className="address-wraper">
            <AddressStage addressStep={"address"}/>
            <div className='address-form'>
                 <form onSubmit={handleSubmit(onSubmit)}>
                     <div>
                         {/* <label htmlFor="">Address<span>*</span></label> */}
                          <span>{errors.address?.type === "required" && "address is required!"}</span>
                          <span>{errors.address?.type === "minLength" && "address must be least 8 character!"}</span>
                          <input name='address' type="text" placeholder='Your Address' {...register("address",{required:true,minLength:8})} />
                     </div>
                      <div>
                          {/* <label htmlFor="">Phone<span>*</span></label> */}
                          <span>{errors.phone?.type === "required" && "phone is required!"}</span>
                          <span>{errors.phone?.type === "minLength" && "phone must be least 8 character!"}</span>
                          <input name='phone' type="number" placeholder='Your Phone' {...register("phone",{required:true,minLength:10})} />
                      </div>
                      <div>
                          {/* <label htmlFor="">City<span>*</span></label> */}
                          <span>{errors.city?.type === "required" && "city is required!"}</span>
                          <input name='city' type="text" placeholder='City' {...register("city",{required:true})} />
                      </div>
                      <div>
                          {/* <label htmlFor="">National<span>*</span></label> */}
                          <span>{errors.national?.type === "required" && "national is required!"}</span>

                          <input name='national' type="text" placeholder='National' {...register("national", { required: true })} />
                      </div>
                      <div>
                          <button>Next Step</button>
                      </div>
                 </form>
            </div>
        </div>
    </div>
  )
}

export default Address