package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import com.github.alaajouri.backend.service.MongoUserDetailsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MongoUserController {
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final MongoUserDetailsService userDataService;


    @DeleteMapping("{id}")
    void deleteUserData(@PathVariable String id) {
        userDataService.deleteUserDataById(id);
    }

    @GetMapping("{id}")
    MongoUser getUserDataById(@PathVariable String id) {
        return userDataService.getUserDataByID(id);
    }

    @PostMapping
    public MongoUser create(@RequestBody MongoUser user) {
        if (user.username() == null || user.username().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }

        if (user.password() == null || user.password().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if (mongoUserRepository.existsByUsername(user.username())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "User already exists"
            );
        }

        MongoUser newUser = new MongoUser(
                UUID.randomUUID().toString(),
                user.username(),
                passwordEncoder.encode(user.password()),
                "BASIC",
                " ",
                " ",
                " ",
                user.weightGoal(),
                user.sleepTimeTarget(),
                user.trainingTimeGoal(),
                user.stepTarget(),
                user.caloriesBurnedTarget()


        );

        MongoUser out = mongoUserRepository.save(newUser);

        return new MongoUser(
                out.id(),
                out.username(),
                null,
                out.role(),
                out.name(),
                out.gender(),
                out.weight(),
                out.weightGoal(),
                out.sleepTimeTarget(),
                out.trainingTimeGoal(),
                out.stepTarget(),
                out.caloriesBurnedTarget()


        );
    }

    @PostMapping("/login")
    public MongoUser login(Principal principal) {
        return getMe1(principal);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/me")
    public MongoUser getMe1(Principal principal) {
        MongoUser me = mongoUserRepository
                .findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        return new MongoUser(
                me.id(),
                me.username(),
                null,
                me.role(),
                me.name(),
                me.gender(),
                me.weight(),
                me.weightGoal(),
                me.sleepTimeTarget(),
                me.trainingTimeGoal(),
                me.stepTarget(),
                me.caloriesBurnedTarget()
        );
    }

    @GetMapping("/me2")
    public String getMe2() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/admin")
    public String getAdminStatus() {
        return "Admin OK";
    }

    @GetMapping
    public String getStatus() {
        return "OK";
    }
}
