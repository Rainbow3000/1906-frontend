import React from 'react'
import './newsletter.scss'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
const NewsLetter = () => {
  return (
    <div className='newsletter-container'>
        <div className="newsletter-container-wrapper">
            <span className='newsletter-title'>Newsletter</span>
              <span className='newsletter-des'>Get timely updates from your favorite products</span>
            <div className='newsletter-your-email'>
                <input type="text" placeholder='Your email'/>
                <button>SEND <SendOutlinedIcon/></button>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter