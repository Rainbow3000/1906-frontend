import {React,useEffect, useState} from 'react'
import './singleProduct.scss'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSingleProduct} from '../../store/slice/productSlice'; 
import {addToCart} from '../../store/slice/cartSlice'; 
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import {createComment,getAllComment} from "../../store/slice/commentSlice"
const SingleProduct = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const productId = location.pathname.split('/')[2]; 
  const {isFetching} = useSelector(state=>state.product); 
  const [listProducts,setListProducts] = useState([]); 
  const singleProducts = listProducts.find(item=>item._id === productId); 
  const {comments}  = useSelector(state=>state.comment); 
  const {user} = useSelector(state=>state.user); 
  const dispatch = useDispatch();
  const [quantityCart,setQuantityCart] = useState(1); 
  const [comment,setComment] = useState(""); 
  const [size,setSize] = useState(singleProducts && singleProducts.size && singleProducts.size[0]);
  const [color,setColor] = useState(singleProducts && singleProducts.color && singleProducts.color[0]); 
  const [indexSize,setIndexSize] = useState(0); 
  

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem('products')); 
    setListProducts(products)
  },[])
  const handleQuantityClick = (type)=>{
      if(type==="decrement"){
        quantityCart > 1 && setQuantityCart(quantityCart => quantityCart - 1) 
      }else{
        setQuantityCart(quantityCart=>quantityCart + 1); 
      }
  }
  const handleSizeClick =(index,type)=>{
        setSize(type)
        setIndexSize(index);
  }

  const handleAddToCart = () => {
    const product = {
      _id:singleProducts._id,
      name: singleProducts.name,
      desc: singleProducts.desc,
      image:singleProducts.image,
      color : color || singleProducts.color[0],
      size :  size || singleProducts.size[0],
      price: singleProducts.price,
      quantity:quantityCart
    }   
     dispatch(addToCart(product))
     navigate("/cart")
  }
  const handleComment = ()=>{
    if(!user){
      navigate('/login'); 
    }else{
       const data = {
          userId:user._id, 
          content:comment, 
          productId
       }
       dispatch(createComment(data)); 
       navigate(0);
    }
  }
  useEffect(()=>{     
      dispatch(getAllComment(productId)); 
      setColor(""); 
  },[])

  const handleChangeColor = (e)=>{
     setColor(e.target.value); 
  }

  return (
    <div className='single-product-container'>  
        {
        isFetching ? <div style={{textAlign:"center"}}>Loading...</div> : <div className="single-product-wraper">
          <img src={singleProducts && singleProducts.image && singleProducts.image[0]} alt="" />
          <div className='single-product-info'>
            <h2 className='single-product-name'>{singleProducts && singleProducts.name}</h2>
            <span className='single-product-description'>{singleProducts && singleProducts.desc}</span>
            <span className='single-product-price'>Price:<b>{singleProducts && singleProducts.price}$</b></span>
            <div className='single-product-color'>
              <label for="color">Color:</label>
              <select onChange={(e)=>handleChangeColor(e)} id='color'>
              {singleProducts && singleProducts.color && singleProducts.color.map((item, index) => {
                return <option>{item}</option>
              })}
              </select>
              {
                singleProducts && singleProducts.color && <div style={color?{backgroundColor: `${color}` }:{backgroundColor:`${singleProducts.color[0]}`}} className='sing-product-color-select'></div>
              }
           
            </div>
            <div className='single-product-size'>
              <span>Size</span>
              {singleProducts && singleProducts.size && singleProducts.size.map((item, index) => {
                return <div className={index === indexSize ? 'single-product-size-click' : ''} onClick={() => handleSizeClick(index, item)} key={item}>{item}</div>
              })}
            </div>
            <div className='single-product-quantity'>
              <div onClick={() => handleQuantityClick("decrement")}><RemoveIcon /></div>
              <div>{quantityCart}</div>
              <div onClick={() => handleQuantityClick("increment")}><AddIcon /></div>
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
        } 
        <div className='hr'></div>
       <div className='single-product-comment'>
          <div className='comment-container'>
            <div className='comment-wraper'>
              <h2>COMMENT CUSTOMER</h2>         
              <div className="comment-hr"></div>
              <div className="comment-area">
                <ul>
                  {
                    comments && comments.map(item=>{
                     return <li>
                        <span>{item.times} / <b>{item.userName}</b></span>
                        <span>{item.comment}</span>
                       <div className="user-comment-hr"></div>
                      </li>
                    })
                  }
                  {
                  comments && comments.length <= 0 && <div style={{marginTop:20,fontSize:20}}>*This product has no reviews yet </div>
                  }
                 
                </ul>
              </div>
            </div>
          <div style={{ width: "100%" }} className="rate-product">
                <h2 style={{width:"100%"}}>PRODUCT RATE STAR</h2>
                <div className="comment-hr"></div>
                <div>
                  <div>
                      <StarOutlineOutlinedIcon className='single-product-star' />
                      <StarOutlineOutlinedIcon className='single-product-star' />
                      <StarOutlineOutlinedIcon className='single-product-star' />
                      <StarOutlineOutlinedIcon className='single-product-star' />
                      <StarOutlineOutlinedIcon className='single-product-star' />
                  </div>
                  <h2>5 / 5</h2>
                </div>
                <div className='product-form-comment'>
                    <input onChange={(e)=>setComment(e.target.value)} placeholder='Your comment...' type="text" />
                    <button onClick={()=>handleComment()}>SEND</button>
                </div>

            </div>
          </div>
       </div>
    </div>
  )
}

export default SingleProduct