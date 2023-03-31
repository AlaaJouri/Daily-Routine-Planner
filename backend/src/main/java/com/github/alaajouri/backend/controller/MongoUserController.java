package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
import com.github.alaajouri.backend.model.MongoUserWithoutIDDTO;
import com.github.alaajouri.backend.service.MongoUserDetailsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MongoUserController {
    private final MongoUserDetailsService userDataService;

    @GetMapping("{id}")
    public MongoUser getUserDataById(@PathVariable String id) {
        return userDataService.getUserDataByID(id);
    }

    @PostMapping
    public MongoUser create(@RequestBody MongoUserDTO user) {
        return userDataService.create(user);
    }


    @PostMapping("/login")
    public MongoUser login(Principal principal) {
        return getMe(principal);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/me")
    public MongoUser getMe(Principal principal) {
        return userDataService.getMe(principal);
    }


    @GetMapping
    public String getStatus() {
        return "OK";
    }
    @PutMapping("{id}")
    public MongoUser updateUserData(@PathVariable String id, @RequestBody MongoUserWithoutIDDTO userdata) {
        return userDataService.updateUserData(id, userdata);
    }

}
