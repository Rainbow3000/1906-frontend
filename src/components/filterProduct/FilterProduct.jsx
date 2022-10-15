import React from 'react'
import './filterproduct.scss'
import {filterProduct} from '../../store/slice/productSlice'; 
import {useDispatch} from 'react-redux'


const sizes = [
  'S',
  'M',
  'L'
];

const colors = [
  'Red',
  'Green',
  'Blue',
  'Gray',
  'White',
  'Orange',
  'Pink',
  'Black',
  'Yellow',
  'Violet'
]


const FilterProduct = () => {
  const dispatch = useDispatch();   
  const handleFilterColor = (value)=>{
      dispatch(filterProduct({type:'color',value}))
  }
  const handleFilterPrice = (value) => {
      dispatch(filterProduct({type:'price',value}))
  }

  return (
    <div className='filter-product-container'>
          <div className='filter-product-type'>
            <div>
                <label for="colors">Color:</label>
                <select onChange={e=>handleFilterColor(e.target.value)} id='colors'>
                      <option value='' >My Color</option>
                      {
                        colors.map(item=>{
                          return <option>{item}</option>
                        })
                      }
                </select>
            </div>
            <div>
                <label for="Price">Price:</label>
                <select onChange={e =>handleFilterPrice(e.target.value)}>
                      <option value='' >My Price</option>
                      <option>Expensive</option>
                      <option>Cheap</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default FilterProduct