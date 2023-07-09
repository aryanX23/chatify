import React from 'react';
import './rightpane.css';
import { IonIcon } from '@ionic/react';
import { closeSharp } from 'ionicons/icons';

export default function Rightpane() {
    return (
        <div className='rightpane'>
            <button className='closeBtn'>
                <IonIcon icon={closeSharp} className="closeIcon" />
            </button>
            <img src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"} alt="userImg" className="userImg" />
            <div className="Details" >
                <h1>Random Person</h1>
                <span>randomemail@gmail.com</span>
            </div>
        </div>
    );
}