'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SendIcon from '@/public/icons/sendIcon';
import Message from './Message';
import { ClipLoader, PulseLoader } from 'react-spinners';

interface ChatMessage {
  text: string;
  isSender: boolean;
}

interface ChatbotProps {
  messages: ChatMessage[];
  setChatbotOpen: (open: boolean) => void;
  sendChatMessage: (message: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  loading?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({
  messages,
  setChatbotOpen,
  sendChatMessage,
  setMessages,
  loading,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendChatMessage(inputValue);
    }
    setInputValue('');
  };

  const endRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (loading) {
      setTypingMessage('AI is generating a response...');
    } else {
      setTypingMessage('');
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && typingMessage) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedMessage((prev) => prev + typingMessage[index]);
        index++;
        if (index === typingMessage.length) {
          clearInterval(intervalId);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [loading, typingMessage]);

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
      <div className="flex-1 overflow-y-auto py-4 px-2 bg-[#120707]">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
        {loading && (
          <div className="flex justify-start px-4 py-2">
            <div className="px-4 py-2 rounded-2xl max-w-[75%] bg-[#e0beb7]/10 text-[#e4d9d7] text-[16px] leading-[22px]">
              <PulseLoader color="#e4d9d7" size={10} />
            </div>
          </div>
        )}
        {!loading && typingMessage && (
          <div className="flex justify-start px-4 py-2">
            <div className="px-4 py-2 rounded-2xl max-w-[75%] bg-[#e0beb7]/10 text-[#e4d9d7] text-[16px] leading-[22px]">
              {displayedMessage}
            </div>
          </div>
        )}
        <div
          className={`mt-1 h-[0.01px] bg-none bottom-0 w-full `}
          ref={endRef}
        ></div>
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
            disabled={loading}
          />
          <button
            type="submit"
            className="w-8 h-8 flex justify-center items-center"
            disabled={loading}
          >
            {!loading ? (
              <SendIcon className="fill-[#e4d9d7]" />
            ) : (
              <ClipLoader color="#e4d9d7" size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
