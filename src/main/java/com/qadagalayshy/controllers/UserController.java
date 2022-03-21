package com.qadagalayshy.controllers;

import com.qadagalayshy.entities.User;
import com.qadagalayshy.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
class UserController {
    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(
            this.userService.findAll()
        );
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> findById(@PathVariable String userId) throws NumberFormatException {
        return ResponseEntity.ok().body(
            this.userService.findById(Long.parseLong(userId))
        );
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable String username) {
        return ResponseEntity.ok().body(
            this.userService.findByUsername(username)
        );
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<?> findAllByRole(@PathVariable String roleName) {
        return ResponseEntity.ok().body(
            null
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok().body(
            this.userService.save(user)
        );
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user) {
        return ResponseEntity.ok().body(
            this.userService.update(user)
        );
    }

    @PostMapping("/remove/{userId}")
    public ResponseEntity<?> remove(@PathVariable String userId) throws NumberFormatException {
        this.userService.remove(Long.parseLong(userId));
        return ResponseEntity.ok().body("deleted. " + userId);
    }
}