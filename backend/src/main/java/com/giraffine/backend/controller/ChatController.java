package com.giraffine.backend.controller;

import com.giraffine.backend.model.Message;
import com.giraffine.backend.repository.MessageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        // message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/" + message.getReceiverId(), message);
        return ResponseEntity.ok("message sent");
    }

    @GetMapping("/conversation/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getConversation(@PathVariable String userId1, @PathVariable String userId2) {
        ObjectId user1 = new ObjectId(userId1);
        ObjectId user2 = new ObjectId(userId2);
        List<Message> conversation = messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(user1, user2, user1, user2);
        return ResponseEntity.ok(conversation);
    }
}
