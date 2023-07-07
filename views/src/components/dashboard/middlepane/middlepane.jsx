import React, { useState } from 'react';
import './middlepane.css';

export default function Middlepane() {
    return (
        <div className='middlepane' >
            <div className='middlepaneHeader' >
                <div className='headerDetails' >
                    <img src={process.env.PUBLIC_URL + '/images/demoImg.jpeg'} alt="img" />
                    <div className='userDetails' >
                        <span className='userName' >Random Person</span>
                        <span className='userStatus' >Online</span>
                    </div>
                </div>
            </div>
            <div className='middlepaneBody' >
                <div className='senderMessage'>
                    <img src={process.env.PUBLIC_URL+"/images/demoImg.jpeg"} alt="avatar" />
                    <div className='innerText'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className='receiverMessage'> 
                    <div className='innerText' >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                    <img src={process.env.PUBLIC_URL+"/images/avatar.jpg"} alt="avatar" />
                </div>
                <div className='senderMessage'>
                    <img src={process.env.PUBLIC_URL+"/images/demoImg.jpeg"} alt="avatar" />
                    <div className='innerText'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className='senderMessage'>
                    <img src={process.env.PUBLIC_URL+"/images/demoImg.jpeg"} alt="avatar" />
                    <div className='innerText'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className='receiverMessage'> 
                    <div className='innerText' >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                    <img src={process.env.PUBLIC_URL+"/images/avatar.jpg"} alt="avatar" />
                </div>
                <div className='receiverMessage'> 
                    <div className='innerText' >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                    <img src={process.env.PUBLIC_URL+"/images/avatar.jpg"} alt="avatar" />
                </div>
                <div className='senderMessage'>
                    <img src={process.env.PUBLIC_URL+"/images/demoImg.jpeg"} alt="avatar" />
                    <div className='innerText'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
            </div>
            <div className='middlepaneFooter'>
                
            </div>
        </div>
    );
}