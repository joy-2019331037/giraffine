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


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService us;
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(us.getAllUsers(), HttpStatus.OK);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/reg")
    public ResponseEntity<String> addQuestion(@RequestBody User user) {
        return us.addUser(user);
    }
    
}
