'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Chatbot from '@/components/chatbot/Chatbot';
import { MessageProps } from '@/components/chatbot/Message';

const ChatbotWrapper: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);

  const sendChatMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSender: true },
    ]);
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      {chatbotOpen ? (
        <div className="h-[400px] w-[300px] rounded-lg shadow-lg transform transition-opacity duration-500 opacity-100 scale-100">
          <Chatbot
            messages={messages}
            setChatbotOpen={setChatbotOpen}
            sendChatMessage={sendChatMessage}
            setMessages={setMessages}
          />
        </div>
      ) : (
        <Image
          src={'/chatbot.svg'}
          alt="Chatbot"
          width={100}
          height={100}
          onClick={() => setChatbotOpen(true)}
          className="hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  );
};

export default ChatbotWrapper;
