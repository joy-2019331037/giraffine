package com.giraffine.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.giraffine.backend.service.UserService;
import com.giraffine.backend.model.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService us;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(us.getAllUsers(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/reg")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        return us.addUser(user);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam("email") String email, @RequestParam("otp") String otp) {
        // System.out.println(email);
        // System.out.println(otp);
        if (email == null || email.isEmpty()) {
            // Handle missing email parameter (e.g., return an appropriate error response)
            return new ResponseEntity<>("Missing required parameter: email", HttpStatus.BAD_REQUEST);
        }
        return us.verifyOtp(email, otp);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        return us.login(user.getEmail(), user.getPassword());
    }
}
