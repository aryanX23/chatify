import React, { useState,useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IonIcon } from '@ionic/react';
import { happyOutline, sendSharp, settingsOutline } from 'ionicons/icons'
import './middlepane.css';

export default function Middlepane() {
    const [chatText, setChatText] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const ref = useRef(null);
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
        console.log(chatText);
        setChatText(prev => "");
        setShowEmojis(prev => false);
    }
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
                <button className='settingsBtn' >
                    <IonIcon icon={settingsOutline} className="settingsIcon" />
                </button>
            </div>
            <div className="middlepaneBody">
                <div className="senderMessage">
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="avatar"
                    />
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className="receiverMessage">
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>
                    <img
                        src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                        alt="avatar"
                    />
                </div>
                <div className="senderMessage">
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="avatar"
                    />
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className="senderMessage">
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="avatar"
                    />
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
                <div className="receiverMessage">
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>
                    <img
                        src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                        alt="avatar"
                    />
                </div>
                <div className="receiverMessage">
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>
                    <img
                        src={process.env.PUBLIC_URL + "/images/avatar.jpg"}
                        alt="avatar"
                    />
                </div>
                <div className="senderMessage">
                    <img
                        src={process.env.PUBLIC_URL + "/images/demoImg.jpeg"}
                        alt="avatar"
                    />
                    <div className="innerText">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                    </div>
                </div>
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
                    onKeyDown ={e => {
                        if (e.key !== 'Enter') return;
                        handleSend();
                    }
                    }
                />
                <button
                    className="emoBtn"
                    onClick={handleShow}
                >
                    <IonIcon className="emoIcon" icon={happyOutline} />
                </button>
                <button className="emoBtn" onClick={handleSend}>
                    <IonIcon className="emoIcon" icon={sendSharp} />
                </button>
                {showEmojis && (
                    <div className="emoPanel">
                        <EmojiPicker className="emoPanel" onEmojiClick={onEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
}