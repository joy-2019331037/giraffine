// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation for ChatBotLocation

// First component - Chatbot
// export const Chatbot = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://www.chatbase.co/embed.min.js";
//     script.async = true;
//     script.defer = true;
//     script.setAttribute('chatbotId', 'P59dk4Jt2hymq16m8q89U');
//     script.setAttribute('domain', 'www.chatbase.co');
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// };



import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ChatbotScript = ({ allowedPaths }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    let scriptAdded = false;

    // Check if the current pathname is in the list of allowed paths
    if (allowedPaths.includes(pathname) && !scriptAdded) {
      // Dynamically load the chatbot script only once
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.async = true;
      script.defer = true;
      script.setAttribute('chatbotId', 'P59dk4Jt2hymq16m8q89U');
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
      scriptAdded = true;
    }

    // Function to toggle the chatbot visibility
    const toggleChatbot = (iframe) => {
      if (!iframe) return;

      // Show or hide the chatbot based on the current pathname
      if (allowedPaths.includes(pathname)) {
        iframe.style.display = 'block';  // Show chatbot
        console.log("Showing chatbot");
      } else {
        iframe.style.display = 'none';   // Hide chatbot
        console.log("Hiding chatbot");
      }
    };

    // Use MutationObserver to detect when the iframe is added to the DOM
    const observer = new MutationObserver(() => {
      const chatbotIframe = document.querySelector('iframe[chatbotId="P59dk4Jt2hymq16m8q89U"]');
      if (chatbotIframe) {
        toggleChatbot(chatbotIframe); // Run toggle function when iframe is found
        observer.disconnect();        // Stop observing once iframe is found
      }
    });

    // Start observing changes in the document body for any new elements (like the chatbot iframe)
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup the observer on unmount
    return () => observer.disconnect();
  }, [pathname, allowedPaths]);

  return null;
};










// import React, { useEffect } from 'react';

// const Chatbot = () => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://www.chatbase.co/embed.min.js";
//     script.async = true;
//     script.defer = true;
//     script.setAttribute('chatbotId', 'P59dk4Jt2hymq16m8q89U');
//     script.setAttribute('domain', 'www.chatbase.co');
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// };

// export default Chatbot;


