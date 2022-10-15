import React from 'react'
import './addressStage.scss'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const AddressStage = ({checkoutStep,addressStep}) => {
  return (
      <div className="address-stage">
          <div>
              <span>{
                  addressStep === "address" ? <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 30 }} /> : <HighlightOffIcon style={{ color: 'red', fontSize: 30 }} />
                }</span>
              <span>Cart</span>
          </div>
          <div className="address-line"></div>
          <div>
              <span>{
                  checkoutStep === "payment" ? <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 30 }} /> : <HighlightOffIcon style={{ color: 'red', fontSize: 30 }} />
        }</span>
              <span>Address</span>
          </div>
          <div className="address-line"></div>
          <div>
              <span><HighlightOffIcon style={{ color: 'red', fontSize: 30 }} /></span>
              <span>Payment</span>
          </div>
      </div>
  )
}

export default AddressStage