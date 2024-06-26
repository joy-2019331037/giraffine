package com.giraffine.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.giraffine.backend.dao.OtpRepository;
import com.giraffine.backend.dao.UserDao;
import com.giraffine.backend.model.OTP;
import com.giraffine.backend.model.User;

@Service
public class UserService {

    @Autowired
    UserDao ud;

    @Autowired
    OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    public List<User> getAllUsers() {
        return ud.findAll();
    }

    public ResponseEntity<String> addUser(User user) {
        try {
            String email = user.getEmail();
            
            if (ud.findByEmail(email).isPresent()) {
                return new ResponseEntity<>("Email address is already registered", HttpStatus.CONFLICT);
            }
            
            
            user.setVerified(false); // Set verified to false initially
            ud.insert(user);
            generateAndSendOtp(user.getEmail()); // Send OTP email
            return new ResponseEntity<>("User registered successfully. Please verify your email.", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Failed to register user", HttpStatus.BAD_REQUEST);
    }

    private void generateAndSendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(999999));
        OTP otpEntity = new OTP(new ObjectId(), email, otp, LocalDateTime.now().plusMinutes(10));
        otpRepository.save(otpEntity);
        sendOtpEmail(email, otp);
    }

    // private void sendOtpEmail(String email, String otp) {
    //     SimpleMailMessage message = new SimpleMailMessage();
    //     message.setTo(email);
    //     message.setSubject("Your OTP Code");
    //     message.setText("Your OTP code is " + otp);
    //     mailSender.send(message);
    // }


    public void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Verification Code for Your GIRAFFINE Account");
        message.setText("Dear User,\n\n"
                + "Thank you for registering with GIRAFFINE. Your verification code is: " + otp + "\n\n"
                + "Please use this code to verify your email and complete your registration.\n\n"
                + "If you did not request this code, please ignore this email.\n\n"
                + "Best regards,\n"
                + "The GIRAFFINE Team");
        mailSender.send(message);
    }

    public ResponseEntity<String> verifyOtp(String email, String otp) {
        Optional<OTP> otpEntity = otpRepository.findByEmail(email);
        if (otpEntity.isPresent() && otpEntity.get().getOtp().equals(otp) &&
            otpEntity.get().getExpiryTime().isAfter(LocalDateTime.now())) {
            User user = ud.findByEmail(email).orElseThrow();
            user.setVerified(true);
            ud.save(user);
            otpRepository.delete(otpEntity.get());
            return new ResponseEntity<>("Email verified successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
    }
}
