'use client';

import React from 'react';

export interface MessageProps {
  text: string;
  isSender: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isSender }) => {
  return (
    <div
      className={`flex items-center ${
        isSender ? 'justify-end' : 'justify-start'
      } px-4 py-2`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] ${
          isSender ? 'bg-[#62342a]' : 'bg-[#e0beb7]/10'
        } text-[#e4d9d7] text-[16px] leading-[22px]`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
