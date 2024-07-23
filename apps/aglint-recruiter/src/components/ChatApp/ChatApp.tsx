import axios from 'axios';
import React, { useState } from 'react';

interface Message {
  value: string;
  type: 'user' | 'assistant';
}
export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      value: 'hello how can i help you',
    },
  ]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    try {
      const newMessage: Message = {
        value: input,
        type: 'user',
      };

      setMessages([...messages, newMessage]);
      setInput('');
      const {
        data: { updated_history },
      } = await axios.post('http://localhost:8080/api/aglint-agent', {
        msg: newMessage.value,
        history: messages,
        company_id: '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc',
      });

      setMessages(() => [...updated_history]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px', // Increased width for desktop view
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff', // Added background color
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            overflowY: 'auto',
            borderBottom: '1px solid #ddd',
          }}
        >
          {messages.map((message, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '10px',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor:
                  message.type === 'user' ? '#e1f5fe' : '#eceff1',
                alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%', // Limit the width of messages
              }}
            >
              {message.value}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ddd',
        }}
      >
        <button
          onClick={() => {
            setMessages([]);
            setInput('');
          }}
        >
          reset history
        </button>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder='Type your message...'
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        />
      </div>
    </div>
  );
};
