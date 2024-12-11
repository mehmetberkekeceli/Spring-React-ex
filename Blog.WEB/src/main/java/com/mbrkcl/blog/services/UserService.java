package com.mbrkcl.blog.services;

import com.mbrkcl.blog.models.User;
import com.mbrkcl.blog.dto.requests.UserRequest;
import com.mbrkcl.blog.dto.responses.UserResponse;
import com.mbrkcl.blog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(UserResponse::new).collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(UserResponse::new).orElse(null);
    }

    public UserResponse createUser(UserRequest userRequest) {
        User user = new User();
        user.setUserName(userRequest.getUserName());
        user.setPassword(userRequest.getPassword());
        user.setFullName(userRequest.getFullName());
        user.setEmail(userRequest.getEmail());
        user.setAvatar(0); // Default avatar value
        userRepository.save(user);
        return new UserResponse(user);
    }

    public UserResponse updateUser(Long id, UserRequest userRequest) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserName(userRequest.getUserName());
            user.setPassword(userRequest.getPassword());
            user.setFullName(userRequest.getFullName());
            user.setEmail(userRequest.getEmail());
            userRepository.save(user);
            return new UserResponse(user);
        }
        return null;
    }

    public User getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User saveOneUser(User newUser) {
        return userRepository.save(newUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
