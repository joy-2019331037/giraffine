package com.giraffine.backend.controller;

import com.giraffine.backend.model.User;
import com.giraffine.backend.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/friends")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendController {

    @Autowired
    private UserRepository ud;

    @PostMapping("/send-request/{userId}/{friendId}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable String userId, @PathVariable String friendId) {
        Optional<User> userOpt = ud.findById(new ObjectId(userId));
        Optional<User> friendOpt = ud.findById(new ObjectId(friendId));

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();
            user.sendFriendRequest(new ObjectId(friendId));
            ud.save(user);
            return ResponseEntity.ok("Friend request sent!");
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PostMapping("/accept-request/{userId}/{friendId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable String userId, @PathVariable String friendId) {
        Optional<User> userOpt = ud.findById(new ObjectId(userId));
        Optional<User> friendOpt = ud.findById(new ObjectId(friendId));

        if (userOpt.isPresent() && friendOpt.isPresent()) {
            User user = userOpt.get();
            User friend = friendOpt.get();

            // Add the friend to the user's friends list and remove the friend request
            if (user.getFriendRequests().contains(new ObjectId(friendId))) {
                user.acceptFriendRequest(new ObjectId(friendId));
                ud.save(user);

                // Also add the user to the friend's friends list
                friend.getFriends().add(new ObjectId(userId));
                ud.save(friend);

                return ResponseEntity.ok("Friend request accepted!");
            } else {
                return ResponseEntity.badRequest().body("No friend request from this user.");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PostMapping("/remove-friend/{userId}/{friendId}")
    public ResponseEntity<?> removeFriend(@PathVariable String userId, @PathVariable String friendId) {
        Optional<User> userOpt = ud.findById(new ObjectId(userId));

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.removeFriend(new ObjectId(friendId));
            ud.save(user);
            return ResponseEntity.ok("Friend removed!");
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }


    @GetMapping("/all-friends/{userId}")
    public ResponseEntity<?> getAllFriends(@PathVariable String userId) {
        Optional<User> userOpt = ud.findById(new ObjectId(userId));

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Set<ObjectId> friendIds = user.getFriends();

            // Fetch all friends from the database based on the list of friend IDs
            List<User> friends = ud.findAllById(friendIds);


            return ResponseEntity.ok(friends);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }
}
