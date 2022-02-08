package com.qadagalayshy.utils;

import com.qadagalayshy.entities.User;

public class UserUtil {
    
    public static User mergeInstances(User user1, User user2) {
        return User.builder()
            .userId(user1.getUserId())
            .username(user2.getUsername() == null ? user1.getUsername() : user2.getUsername())
            .firstName(user2.getFirstName() == null ? user1.getFirstName() : user2.getFirstName())
            .lastName(user2.getLastName() == null ? user1.getLastName() : user2.getLastName())
            .patronymic(user2.getPatronymic() == null ? user1.getPatronymic() : user2.getPatronymic())
            .prosecutor(user2.getProsecutor() == null ? user1.getProsecutor() : user2.getProsecutor())
            .position(user2.getPosition() == null ? user1.getPosition() : user2.getPosition())
            .password(user2.getPassword() == null ? user1.getPassword() : user2.getPassword())
            .build();
    }

    public static boolean validCredentials(String username, String password) {
        return (username == null || username.isEmpty()) || (password == null || password.isEmpty());
    }
}