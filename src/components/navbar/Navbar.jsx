import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './navbar.scss'
import { Badge } from '@mui/material'
import {Link} from 'react-router-dom'
import { useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {setCart} from '../../store/slice/cartSlice'; 
import {loginSuccess,logout} from '../../store/slice/userSlice'
import MenuSide from '../menuSide/MenuSide';
const Navbar = () => {
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const {products} = useSelector(state=>state.cart); 
    const {user} = useSelector(state=>state.user); 
    const path = location.pathname.split('/')[1];
    const [menuClick,setMenuClick]  = useState(false)
    const menuToggleRef = useRef();
    const menuRef = useRef(); 
    useEffect(()=>{
        setMenuClick(false); 
        menuRef.current.style.transform = "translateX(-100%)";
    },[path])
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart'));
        const dataUser = JSON.parse(localStorage.getItem('user'));
        if(dataUser){
            dispatch(loginSuccess(dataUser))
        }
        if (data) {
            dispatch(setCart(data))
        }
    }, [dispatch])

        const handleMenu = ()=>{
            menuRef.current.style.transform = "translateX(-100%)" 
            setMenuClick(!menuClick);
        }
      
        if(menuClick === true){
            menuRef.current.style.transform = "translateX(0%)";
        }
    const handleLogout =()=>{
        dispatch(logout()); 
    }

    const toggleMenu = ()=>{
        menuRef.current.style.transform = "translateX(-100%)"
        setMenuClick(!menuClick)
    }
    return (
    <div className='navbar-container'>
        <div className="navbar-wraper">
            <MenuSide menuRef={menuRef} toggleMenu={toggleMenu} user={user}/>
            <div className='navbar-left'>
                <div className='navbar-left-logo'>
                    <Link to="/">
                            <h1><span style={{ color:"#5ac496"}} >1906</span><span style={{color:"gray"}}>S</span><small style={{color:"orangered"}}>tore</small></h1>
                    </Link>
                </div>
            </div>
            <div className='navbar-center'>
                <div className='navbar-center-input'>
                    <input type="text" placeholder='Search...' />
                    <SearchIcon className='navbar-center-search-icon'/>
                </div>
            </div>
            <div className='navbar-right'>
                <ul>
                    <li>ABOUT</li>
                    <li>CONTACT</li>
                    {user ? "": <li><Link to='/login'>LOGIN</Link></li>}
                    {user ? "":<li><Link to="/register">REGISTER</Link></li> }
                        {user ?(<>
                            <li className='navbar-username'><Link to="/me"><img alt='' width={30} height={30} src='https://ichef.bbci.co.uk/images/ic/1200x675/p0222n9d.jpg' /></Link>{`hello!,${user.userName}`}
                        </li><li onClick={handleLogout} >LOGOUT</li> 
                        </>
                        ):""
                    }
                    <li><Link to="/cart"><Badge badgeContent={products.length} color="primary">
                          <ShoppingCartOutlinedIcon />
                        </Badge></Link></li>
                </ul>
            </div>
            <div className='navbar-right-cart-icon'>
                    <Link to="/cart"><Badge badgeContent={products.length} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge></Link>
            </div>
            <div onClick={handleMenu} ref={menuToggleRef} className={menuClick === true ? "navbar-menu navbar-menu-toggle":"navbar-menu"}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar