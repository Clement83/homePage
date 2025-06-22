import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { FloatingBubble } from "./FloatingBubble";
import LoadingDots from "../loadingDot";

type Props = {
    triggerWebhook?: (e: any, id: string, name: string) => void;
};

type Message = {
    type: "user" | "bot";
    text: string;
};

const ChatToggle = ({ triggerWebhook }: Props) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsChatOpen(!isChatOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isChatOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && message.trim()) {
            sendMessage();
        }
    };

    const sendMessage = async () => {
        const userMessage = message.trim();
        if (!userMessage) return;

        setChatHistory((prev) => [...prev, { type: "user", text: userMessage }]);
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("https://api.home.quintard.me/api/ollama", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            try {
                const objectResponse = JSON.parse(data.response);
                const botMessage = objectResponse.message;
                const action = objectResponse.action;

                setChatHistory((prev) => [...prev, { type: "bot", text: botMessage }]);

                if (action) {
                    triggerWebhook?.(null, action, action);
                }
            } catch (err) {
                setChatHistory((prev) => [...prev, { type: "bot", text: "Réponse illisible." }]);
            }
        } catch (err) {
            setChatHistory((prev) => [...prev, { type: "bot", text: "Erreur de connexion." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isChatOpen ? (
                <div className="bg-white rounded-xl shadow-lg w-80 h-96 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2">
                        <span>Assistant</span>
                        <button onClick={handleToggle}>
                            <Icon icon="ic:round-close" width="24" height="24" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
                        {chatHistory.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`text-sm px-3 py-2 rounded-lg max-w-[75%] ${msg.type === "user"
                                    ? "bg-blue-500 text-white self-end ml-auto"
                                    : "bg-gray-200 text-gray-800 self-start mr-auto"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="text-sm px-3 py-2 rounded-lg max-w-[75%] bg-gray-200 text-gray-800 self-start mr-auto italic">
                                réflexion en cours<LoadingDots />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t bg-white flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                            placeholder="Écris ton message..."
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            className="text-blue-600 hover:text-blue-800"
                            disabled={loading}
                        >
                            <Icon icon="mdi:send" width="24" height="24" />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={handleToggle}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                    <Icon icon="ic:round-chat" width="24" height="24" />
                </button>
            )}
        </div>
    );
};

export default ChatToggle;
