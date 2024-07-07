import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute('chatbotId', 'P59dk4Jt2hymq16m8q89U');
    script.setAttribute('domain', 'www.chatbase.co');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;