import React, { useState } from 'react';
import './leftpane.css';
import { IonIcon } from '@ionic/react';
import { add, searchSharp } from 'ionicons/icons';
export default function Leftpane() {
    return (
        <div className='leftpane'>
            <div className='leftpaneHeader'>
                <img src={process.env.PUBLIC_URL + '/images/avatar.jpg'} alt="avatar" />
                <div className='userInfo' >
                    <span className='userName'>
                        Aryan Rai
                    </span>
                    <div className='userId' >
                        <span>@nd63hs83jd64h57</span>
                    </div>
                </div>
            </div>  
            <div className='leftpaneBody' >
                <div className='leftpaneBodyTitle' >
                    <span>Messages</span>
                    <IonIcon className='icon' icon={add}/>
                </div>
                <div className='searchBar' >
                    <input type="text" name="search" className='search' placeholder='Search...' />
                    <IonIcon icon={searchSharp} className='searchicon' />
                </div>
                <div className='messageList' >
                    <div className='messages'>
                        <img src={process.env.PUBLIC_URL + '/images/demoImg.jpeg'} alt="img" />
                        <div className='chatDetails' >
                            <span className='chatName' >Random Person</span>
                            <span className='chatMessage' >hello there!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}