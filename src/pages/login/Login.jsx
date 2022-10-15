import React from 'react'
import {useEffect} from 'react'
import './login.scss'
import {userLogin,loginStart,loginFalure} from '../../store/slice/userSlice'
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const Login = () => { 
  const {register,handleSubmit,formState:{errors}} = useForm(); 
  const dispatch = useDispatch(); 
  const {errorMessage} = useSelector(state => state.user); 
  const user = JSON.parse(localStorage.getItem('user'));
  const query = window.location.search; 
  const queryPath = query.split('=')[1]; 

  let navigate = useNavigate(); 
  if (user) {
    if(queryPath){
      navigate(`/${queryPath}`); 
    }else{
      navigate('/');
    }
  }
  const onSubmit = (data)=>{
    dispatch(loginStart());
    dispatch(userLogin(data))
    dispatch(loginFalure());
    if(errorMessage){
      return; 
    }
  
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
   if (user) {
    if(queryPath){
      navigate(`/${queryPath}`); 
    }else{
      navigate('/');
    }
  }
  },[])
  return (
    <div className='login-container'>
      <div className="login-wraper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>    
          <div>
            <span style={{textAlign:'center',color:'red'}}>{errorMessage && errorMessage.login}</span>
            <label htmlFor="">Your email <span>*</span></label>
            <span className='error-login'>{errors.email?.type === "required" && "email is required!"}</span>
            <span className='error-login'>{errors.email?.type === "pattern" && "email is invalid!"}</span>
            <input name='email' type="email" placeholder='Your email' {...register("email", { required: true, pattern: /^[A-Z0-9 ._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i })} />
          </div>
          <div>
            <label htmlFor="">Password <span>*</span></label>
            <span className='error-login'>{errors.password?.type === "required" && "password is required!"}</span>
            <span className='error-login'>{errors.password?.type === "minLength" && "password must be least 8 character!"}</span>
            <input name='password' type="password" placeholder='Password' {...register("password",{ required: true, minLength: 8})} />
          </div>
          <div>
            <Link to="/register">Do you not have an account?</Link>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login