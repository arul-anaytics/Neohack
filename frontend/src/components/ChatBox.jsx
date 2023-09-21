import React, { useState } from 'react';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatLog([...chatLog, { type: 'user', content: message }]);
            setMessage('');
        }
    };

    return (
        <div className="t-min-h-screen t-bg-gray-100 t-flex t-flex-col t-items-center t-justify-center t-p-4">
            <div className="t-bg-white t-rounded-lg t-shadow-md t-w-full t-max-w-md t-flex t-flex-col">
                <div className="t-p-4 t-border-b t-border-gray-200">
                    <h1 className="t-text-xl t-font-semibold">Telegram Bot</h1>
                </div>
                <div className="t-flex-1 t-overflow-y-auto t-p-4">
                    {chatLog.map((msg, index) => (
                        <div key={index} className={`t-mb-4 t-${msg.type === 'user' ? 't-text-right' : 't-text-left'}`}>
                            <div className={`t-inline-block t-rounded-lg t-p-2 t-bg-${msg.type === 'user' ? 't-blue-500' : 't-gray-300'} t-text-${msg.type === 'user' ? 't-white' : 't-black'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="t-border-t t-border-gray-200 t-p-4 t-flex">
                    <input
                        type="text"
                        className="t-flex-1 t-rounded-l-lg t-p-2 t-border t-border-gray-300 t-outline-none"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="t-bg-blue-500 t-text-white t-rounded-r-lg t-p-2 t-ml-2 t-font-semibold"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
