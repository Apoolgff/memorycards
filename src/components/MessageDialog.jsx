import React from 'react';
import './MessageDialog.css';

const MessageDialog = ({ message, onClose }) => {
  return (
    <div className="message-dialog">
      <div className="message-content">
        <p className="message-text">{message}</p>
        <span className="close-button message-button" onClick={onClose}>
         Reiniciar
        </span>
      </div>
    </div>
  );
};

export default MessageDialog;
