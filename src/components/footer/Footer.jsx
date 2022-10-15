import React from 'react'
import './footer.scss'
const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-wraper'>
            <div className="footer-left">
                <ul>
                  <li>Email:nguyenducthinh0401@gmail.com</li>
                  <li>Address Shop:40 DinhQuan,HN City</li>
                  <li>Phone Support:+123 456 789</li>
                  <li>Link:https://1906 Store</li>
                </ul>
            </div>
            <div className="footer-center">
              <ul>
                <li>Delivery fast any where</li>
                <li>Insurance one change one if product defective</li>
                <li>Support customer 24 / 7</li>
                <li>Payments safe and security info customer</li>
              </ul>
            </div>
            <div className="footer-right">
                <img alt='' width={200} src="https://digital.hbs.edu/platform-digit/wp-content/uploads/sites/2/2020/02/visa-logo-png-2026-1.png"/>         
            </div>
        </div>
    </div>
  )
}

export default Footer