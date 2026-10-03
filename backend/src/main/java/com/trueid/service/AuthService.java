package com.trueid.service;

import com.trueid.model.User;
import com.trueid.repository.UserRepository;
import com.trueid.security.JwtUtil;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, Object> signup(String name, String email,
                                      String organization, String password) {
        if (name == null || name.isBlank() || email == null || email.isBlank()
                || password == null || password.length() < 6) {
            throw new IllegalArgumentException(
                    "Name, email and a password of at least 6 characters are required");
        }

        String cleanEmail = email.trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(name.trim());
        user.setEmail(cleanEmail);
        user.setOrganization(organization);
        user.setPasswordHash(passwordEncoder.encode(password));
        userRepository.save(user);

        return buildResponse(user);
    }

    public Map<String, Object> login(String email, String password) {
        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return buildResponse(user);
    }

    public Map<String, Object> getProfile(String email) {
        return userData(findUser(email));
    }

    public Map<String, Object> updateProfile(String email, String name, String organization) {
        User user = findUser(email);

        if (name != null && !name.isBlank()) {
            user.setName(name.trim());
        }
        if (organization != null) {
            user.setOrganization(organization.trim());
        }

        userRepository.save(user);
        return userData(user);
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private Map<String, Object> userData(User user) {
        Map<String, Object> userData = new LinkedHashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("organization", user.getOrganization());
        userData.put("role", user.getRole());
        return userData;
    }

    private Map<String, Object> buildResponse(User user) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("token", jwtUtil.generateToken(user.getEmail()));
        response.put("user", userData(user));
        return response;
    }
}