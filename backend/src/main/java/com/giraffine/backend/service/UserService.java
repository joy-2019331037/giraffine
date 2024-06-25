package com.giraffine.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.giraffine.backend.dao.UserDao;
import com.giraffine.backend.model.User;

@Service
public class UserService {

    @Autowired
    UserDao ud;

    public List<User> getAllUsers() {
        return ud.findAll();
    }

    public ResponseEntity<String> addUser(User user) {
        try {
            ud.insert(user);
            return new ResponseEntity<>("user registered successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("failed to register user", HttpStatus.BAD_REQUEST);
    }

}
