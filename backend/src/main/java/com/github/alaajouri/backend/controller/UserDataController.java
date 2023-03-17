package com.github.alaajouri.backend.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.service.UserDataService;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class UserDataController {
    private final UserDataService userDataService;
    @PostMapping("/userdata")
    public UserData addWorkout(@RequestBody UserData userData) {
        return userDataService.addUserData(userData);
    }
}