package com.project.HappyHotel;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AdminPassword {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("BCrypt hash: " + encodedPassword);
    }
}
