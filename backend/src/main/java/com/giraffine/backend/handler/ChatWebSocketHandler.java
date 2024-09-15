package com.giraffine.backend.handler;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Echo the message back to the client (for testing purposes)
        session.sendMessage(new TextMessage("Server received: " + message.getPayload()));
    }
}
