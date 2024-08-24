import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { toast } from 'react-toastify';

const RatingUpdates = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Connect to the WebSocket endpoint
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/ratingUpdates', (message) => {
                const notification = message.body + "\nVisit your profile for details";
                toast.success(notification, {
                    position: "top-right",
                    
                    hideProgressBar: false,
                    // closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClick: () => navigate('/profile') 
                });
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return null;
};

export default RatingUpdates;
