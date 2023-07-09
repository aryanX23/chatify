import React, { useState,useRef,useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IonIcon } from '@ionic/react';
import { happyOutline, sendSharp, settingsOutline } from 'ionicons/icons'
import './middlepane.css';
import { Axios, URL } from '../../../api/axios';

export default function Middlepane() {
    const [chatText, setChatText] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [messages, setMessages] = useState([]);
    const ref = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const conId = localStorage.getItem("conversationId");
        if (conId !== null || conId !== "") {
            Axios.get(URL + "/api/message/get/" + conId).then(
                (response) => {
                    const data = response.data.data;
                    setMessages((prev) => data);
                }
            ).catch((err)=>{console.log(err)});
        }
    }, []);
    //console.log(messages);
    useEffect(() => {
        scrollToBottom();
    }, [chatText,messages]);
    function handleShow() {
        setShowEmojis(!showEmojis);
    }
    function handleChange(e) {
        setChatText(prev => e.target.value);
    }
    const onEmojiClick = (event, emojiObject) => {
        const cursor = ref.current.selectionStart;
        const text =
            chatText.slice(0, cursor) +
            event.emoji +
            chatText.slice(cursor);
        setChatText(text);
        const newCursor = cursor + event.emoji.length;
        setTimeout(
            () => ref.current.setSelectionRange(newCursor, newCursor),
            10
        );
    }
    function handleSend(e) {
        if (chatText !== "") {
            const conversationId = localStorage.getItem("conversationId");
            if (conversationId === null) {
                setChatText((prev) => "");
                setShowEmojis((prev) => false);
                return;
            }
            const bodyFormData = {
                conversationId: conversationId,
                senderId: localStorage.getItem("userId"),
                message: chatText
            };
            Axios({
                method: "post",
                url: URL + "/api/message/set",
                withCredentials: true,
                data: bodyFormData,
            }).then(response=>console.log(response));
            setChatText(prev => "");
            setShowEmojis(prev => false);
        }
    }
    const divs = messages?.map(
        ({ message , senderId }) => {
            if(senderId === localStorage.getItem("userId"))
                return (
                    <div className="receiverMessage">
                        <div className="innerText">
                            {message}
                        </div>
                        <img
                            src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                            alt="avatar"
                        />
                    </div>
                );
            else
               return (
                   <div className="senderMessage">
                       <img
                           src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                           alt="avatar"
                       />
                       <div className="innerText">{message}</div>
                   </div>
               ); 
        }
    );
    return (
        <div className="middlepane">
            <div className="middlepaneHeader">
                <div className="headerDetails">
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="img"
                    />
                    <div className="userDetails">
                        <span className="userName">Random Person</span>
                        <span className="userStatus">Online</span>
                    </div>
                </div>
                <button className="settingsBtn">
                    <IonIcon icon={settingsOutline} className="settingsIcon" />
                </button>
            </div>
            <div className="middlepaneBody">
                {divs ? divs : ""}
                <div ref={messagesEndRef} />
            </div>
            <div className="middlepaneFooter">
                <input
                    type="text"
                    name="chatText"
                    placeholder="Type your message here"
                    className="chatText"
                    value={chatText}
                    onChange={handleChange}
                    ref={ref}
                    onClick={() => setShowEmojis(false)}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        handleSend();
                    }}
                />
                <button className="emoBtn" onClick={handleShow}>
                    <IonIcon className="emoIcon" icon={happyOutline} />
                </button>
                <button className="emoBtn" onClick={handleSend}>
                    <IonIcon className="emoIcon" icon={sendSharp} />
                </button>
                {showEmojis && (
                    <div className="emoPanel">
                        <EmojiPicker
                            className="emoPanel"
                            onEmojiClick={onEmojiClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}