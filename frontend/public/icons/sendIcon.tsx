import React from 'react';

interface SendIconProps {
  className?: string;
}

const SendIcon: React.FC<SendIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
        fill="#FFFDD0"
      ></path>
    </svg>
  );
};

export default SendIcon;
