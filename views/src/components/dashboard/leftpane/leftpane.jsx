import React, { useState, useEffect } from "react";
import "./leftpane.css";
import { IonIcon } from "@ionic/react";
import { add, searchSharp } from "ionicons/icons";
import { Axios, URL } from "../../../api/axios";
export default function Leftpane() {
    const [userDetails, setUserDetails] = useState({
        userId: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
        fullName: localStorage.getItem("fullName"),
    });
    const [userConversations, setUserConversation] = useState([]);
    useEffect(() => {
        Axios.get(URL + "/api/conversation/" + userDetails.userId).then(
            (response) => {
                const data = response.data;
                setUserConversation((prev) => data);
            }
        );
    }, [userDetails.userId]);

    const divs = userConversations.map(
        ({ conversationId, user: { email, fullName } }) => {
            return (
                <div className="messages" key={conversationId}>
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="img"
                    />
                    <div className="chatDetails">
                        <span className="chatName">{fullName}</span>
                        <span className="chatMessage">hello there!</span>
                    </div>
                </div>
            );
        }
    );

    return (
        <div className="leftpane">
            <div className="leftpaneHeader">
                <img
                    src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                    alt="avatar"
                />
                <div className="userInfo">
                    <span className="userName">{userDetails.fullName}</span>
                    <div className="userId">
                        <span>{userDetails.userId}</span>
                    </div>
                </div>
            </div>
            <div className="leftpaneBody">
                <div className="leftpaneBodyTitle">
                    <span>Messages</span>
                    <IonIcon className="icon" icon={add} />
                </div>
                <div className="searchBar">
                    <input
                        type="text"
                        name="search"
                        className="search"
                        placeholder="Search..."
                    />
                    <IonIcon icon={searchSharp} className="searchicon" />
                </div>
                <div className="messageList">
                    {divs ? divs : ""}
                </div>
            </div>
        </div>
    );
}
