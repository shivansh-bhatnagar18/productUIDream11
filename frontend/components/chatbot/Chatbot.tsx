'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import SendIcon from '@/public/icons/sendIcon';
import Message from './Message';

interface ChatMessage {
  text: string;
  isSender: boolean;
}

interface ChatbotProps {
  messages: ChatMessage[];
  setChatbotOpen: (open: boolean) => void;
  sendChatMessage: (message: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({
  messages,
  setChatbotOpen,
  sendChatMessage,
  setMessages,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendChatMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="w-full h-full bg-[#1a0c0b] rounded-3xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="h-16 bg-[#1a0c0b] flex items-center justify-between px-6 py-4 rounded-t-3xl border-b border-[#62342a]">
        <Image
          src="/back.svg"
          alt="Chatbot"
          width={26}
          height={26}
          onClick={() => {
            setChatbotOpen(false);
            setMessages([]);
          }}
          className="cursor-pointer"
        />
        <div className="text-center text-[#ebd5d0]/80 text-xl font-bold">
          Dreamer AI
        </div>
        <div className="w-6 h-6" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#120707]">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-[#1a0c0b] px-4 py-4 border-t border-[#62342a]">
        <form
          onSubmit={handleSend}
          className="flex items-center bg-[#e0beb7]/10 rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Send a message..."
            className="w-full bg-transparent text-[#e4d9d7] text-[16px] font-normal font-['Plus Jakarta Sans'] focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="w-8 h-8 flex justify-center items-center"
          >
            <SendIcon className="fill-[#e4d9d7]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
