import React from 'react';
import './signIn.css';
import { IonIcon } from '@ionic/react';
import { mail, lockClosed } from 'ionicons/icons';
import { Link, useNavigate } from 'react-router-dom';
export default function SignIn() {
    const navigate = useNavigate();
    return (
        <div className='signInBody' >
            <img src={process.env.PUBLIC_URL + "/images/signupbg1.jpg"} alt="background" className='signInbg' />
            <div className='headerBody' >
                <div className='headerTitle'>
                    <span>Chatify</span>
                </div>
                <div>
                    <button className='actionButton' onClick={()=>{navigate('/register')}} >Register</button>
                </div>
            </div>

            <div className='formWrapper' >
                <div className='form-box'>
                    <h2>Login</h2>
                    <form onSubmit={() => console.log("submited")}>
                        <div className='input-box' >
                            <span className='icon' >
                                <IonIcon icon={mail} />
                            </span>
                            <input type="email" placeholder=' ' required/>
                            <label>Email</label>
                        </div>
                        <div className='input-box' >
                            <span className='icon' >
                                <IonIcon icon={lockClosed} />
                            </span>
                            <input type="password" placeholder=' ' required/>
                            <label>Password</label>
                        </div>
                        <div className='remember-forgot'>
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                            <Link>Forgot Password?</Link>
                        </div>
                        <button type='submit' className='btn' >Login</button>
                        <div className='login-register' >
                            <p>
                                Don't have an account?
                                <Link to='/register'>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}