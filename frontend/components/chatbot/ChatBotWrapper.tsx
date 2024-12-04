'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Chatbot from '@/components/chatbot/Chatbot';
import { MessageProps } from '@/components/chatbot/Message';
import axios from 'axios';

interface ChatbotWrapperProps {
  player1_id?: string;
  player2_id?: string;
  match_no?: string;
  compare?: boolean;
}

const ChatbotWrapper: React.FC<ChatbotWrapperProps> = ({
  player1_id = '',
  player2_id = '',
  match_no = '',
  compare = false,
}) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  // console.log('BASE_URL', BASE_URL);
  const sendChatMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSender: true },
    ]);
    setLoading(true);
    if (compare && player1_id != '' && player2_id != '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Please select two players to compare', isSender: false },
      ]);
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/chat', {
          player1_id: `${player1_id}`,
          player2_id: `${player2_id}`,
          user_query: `${message}`,
          match_no: match_no != '' ? Number(match_no) : '',
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, isSender: false },
        ]);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };
  // console.log('player1_id', player1_id);
  // console.log('player2_id', player2_id);
  // console.log('match_no', match_no);
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      {chatbotOpen ? (
        <div className="h-[450px] w-[400px] rounded-lg shadow-lg transform transition-opacity duration-500 opacity-100 scale-100">
          <Chatbot
            messages={messages}
            setChatbotOpen={setChatbotOpen}
            sendChatMessage={sendChatMessage}
            setMessages={setMessages}
            loading={loading}
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
