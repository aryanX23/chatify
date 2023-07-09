import React, { useState, useEffect } from "react";
import "./leftpane.css";
import { IonIcon } from "@ionic/react";
import { addSharp, sendSharp, searchSharp } from "ionicons/icons";
import { Axios, URL } from "../../../api/axios";
export default function Leftpane() {
    const [userDetails] = useState({
        userId: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
        fullName: localStorage.getItem("fullName"),
    });
    const [visibility, setVisibility] = useState(false);
    const [userConversations, setUserConversation] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    useEffect(() => {
        Axios.get(URL + "/api/conversation/" + userDetails.userId).then(
            (response) => {
                const data = response.data;
                setUserConversation((prev) => data);
            }
        );
    }, [userConversations]);

    const divs = userConversations.map(
        ({ conversationId, user: { email, fullName } }) => {
            return (
                <div className="messages" key={conversationId} onClick={()=>{localStorage.setItem("conversationId",conversationId)}}>
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
    function handleAddUser() {
        const bodyFormData = {
            senderId: userDetails.userId,
            receiverId: receiverId
        }
        Axios({
            method: "post",
            url: URL + "/api/conversation/",
            withCredentials: true,
            data: bodyFormData,
        }).then(response => console.log(response));
        setReceiverId(prev => "");
        setVisibility(prev => false);
    }

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
                <button
                    className="addIcon"
                    onClick={() => setVisibility((prev) => !prev)}
                >
                    <IonIcon className="icon" icon={addSharp} />
                </button>
            </div>
            <div className="leftpaneBody">
                <div className="leftpaneBodyTitle">
                    <span>Messages</span>
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
                    {visibility && (
                        <div className="addUserBody">
                            <span>Add User</span>
                            <div className="searchBar">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Add User"
                                    onChange={(e) => setReceiverId(prev => e.target.value)}
                                    value={receiverId}
                                />
                                <button className="sendIconBtn" onClick={handleAddUser} >
                                <IonIcon
                                    icon={sendSharp}
                                    className="sendIcon"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                    {divs ? divs : ""}
                </div>
            </div>
        </div>
    );
}
