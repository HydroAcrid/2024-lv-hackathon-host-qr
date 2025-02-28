import React from 'react'
import TextLogo from './uniMartTextLogo.jsx'
import UniMartLogo from '../assets/UniMart Logo.svg'
import './css/navbar.css'
import ProfileIcon from '../assets/Profile.svg'
import NotificationsIcon from '../assets/Notifications.svg'
import MessagesIcon from '../assets/Messages.svg'



function navbar() {
return (
    <div className='navBar'>
            <div className='left'>
                    <TextLogo />
                    <img src={UniMartLogo} alt='UniMart Logo' />
            </div>
            <div className='right'>
                    <a href='/notifications'>
                            <img src={NotificationsIcon} alt='Notifications Icon' />
                    </a>
                    
                    <a href='/messages'>
                            <img src={MessagesIcon} alt='Messages Icon' />
                    </a>

                    <a href='/profile'>
                            <img src={ProfileIcon} alt='Profile Icon' />
                    </a>
            </div>
    </div>
)
}

export default navbar