import React from 'react'
import './product.scss'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
const Product = ({item}) => {
  return (
    <Link className='product-container' to={`/single/${item._id}`}>
              <div className='product-circle'></div>
              <img src={item.image}  alt=""/>
              <div className='product-options'>
                <FavoriteBorderOutlinedIcon className='product-options-icon'/>
                <SearchOutlinedIcon className='product-options-icon' />
                <ShoppingCartOutlinedIcon className='product-options-icon' />
              </div>
    </Link>
  )
}

export default Product