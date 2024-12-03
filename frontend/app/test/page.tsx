'use client';

import Image from 'next/image';
import React from 'react';
import SendIcon from '@/public/icons/sendIcon';

// Define the MessageProps type for the Message component
interface MessageProps {
  text: string;
  isSender: boolean;
}

// Message Component
const Message: React.FC<MessageProps> = ({ text, isSender }) => {
  return (
    <div
      className={`flex items-center ${
        isSender ? 'justify-end' : 'justify-start'
      } px-4 py-2`}
    >
      <div
        className={`px-4 py-2 rounded-2xl ${
          isSender ? 'bg-[#62342a]' : 'bg-[#e0beb7]/10'
        } text-[#e4d9d7] text-[16px] font-normal font-["Plus Jakarta Sans"] leading-[22px]`}
      >
        {text}
      </div>
    </div>
  );
};

// Define the Message type for the messages array
interface ChatMessage {
  text: string;
  isSender: boolean;
}

// Chatbot Component
const Chatbot: React.FC = () => {
  // Mock messages array
  const messages: ChatMessage[] = [
    { text: 'Hey, how are you?', isSender: false },
    { text: "I'm good, thanks! How about you?", isSender: true },
    { text: 'Doing well! What are you up to?', isSender: false },
    { text: 'Just relaxing. Maybe go for a hike.', isSender: true },
    { text: 'That sounds fun! Enjoy!', isSender: false },
    { text: 'Thanks! Catch you later.', isSender: true },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-[#0d0402]">
      <div className="w-[450px] h-[600px] bg-[#1a0c0b] rounded-3xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="h-16 bg-[#1a0c0b] flex items-center justify-between px-6 py-4 rounded-t-3xl border-b border-[#62342a]">
          <Image src="/back.svg" alt="Chatbot" width={26} height={26} />
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
          <div className="flex items-center bg-[#e0beb7]/10 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Send a message..."
              className="w-full bg-transparent text-[#e4d9d7] text-[16px] font-normal font-['Plus Jakarta Sans'] focus:outline-none"
            />
            <button className="w-8 h-8 flex justify-center items-center">
              <SendIcon className="fill-[#e4d9d7]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
