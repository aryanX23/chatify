import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Axios, URL } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Leftpane from './leftpane/leftpane';
import Rightpane from './rightpane/rightpane';
import Middlepane from './middlepane/middlepane';
export default function Dashboard() {
    const [userDetails, setUserDetails] = useState({
        userId: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
        fullName: localStorage.getItem("fullName")
    });
    const navigate = useNavigate();
    useEffect(() => {
        Axios({
            method: "post",
            url: URL + "/api/users/checkAuth/",
            data: {
                userId:localStorage.getItem("userId"),
            },
            withCredentials:true,
            })
            .then(function (response) {
                if (!response.data.authenticated) {
                    localStorage.clear();
                    setUserDetails(prev => ({
                        fullName: "",
                        email: "",
                        userId: ""
                    }));
                    navigate('/');
                }
                else {
                    localStorage.setItem("isAuthenticated",true);
                }
            })
            .catch(function (response) {
                console.log("Invalid Operation!");
            });
    }, [navigate]);
    function handleLogout() {
        Axios({
            method: "post",
            url: URL + "/api/users/logOut/",
            data: {
                userId:userDetails.userId,
            },
            withCredentials:true,
            })
            .then(function (response) {
                localStorage.clear();
                setUserDetails(prev => ({
                    fullName: "",
                    email: "",
                    userId:""
                }));
                navigate('/');
            })
            .catch(function (response) {
                console.log("Invalid Operation!");
            });
    }
    return (
        <div className='dashboardBody'>
            <Leftpane/>
            <Middlepane/>
            <Rightpane/>
        </div>
    );
}