import {React,useEffect} from 'react'
import './productList.scss'
import Product from '../product/Product'
import { fetchProducts } from '../../store/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux'
import FilterProduct from '../filterProduct/FilterProduct';
const ProductList = () => {
  const dispatch = useDispatch();
  const {listProducts} = useSelector(state => state.product); 
  useEffect(()=>{
    dispatch(fetchProducts()); 
  },[dispatch])
  return (
    <div  className='product-list-container' id='product'>
      <h2>PRODUCT</h2>
      <div className='product-delimiter'></div>
      <div className="product-list-wraper">
          <FilterProduct/>
          <div className='product-list'>
            {listProducts && listProducts.map(item=>{
              return <Product key={item._id} item={item} />
            })}
          </div>
      </div>
    </div>
  )
}

export default ProductList