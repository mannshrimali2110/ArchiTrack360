import React from 'react';

const Notification = ({ message, type = 'success' }) => {
  const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      className={`fixed top-5 right-5 ${backgroundColor} text-white px-4 py-2 rounded shadow-lg transition-transform transform translate-x-0`}
      style={{ animation: 'slideOut 3s forwards' }}
    >
      {message}
      <style>{`
        @keyframes slideOut {
          0% {
            transform: translateX(0);
          }
          90% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;