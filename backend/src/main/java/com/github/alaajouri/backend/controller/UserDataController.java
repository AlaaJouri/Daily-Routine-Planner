package com.github.alaajouri.backend.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.service.UserDataService;
import com.github.alaajouri.backend.model.UserdataDTO;

@RestController
@RequestMapping("/api/userdata/")
@RequiredArgsConstructor
public class UserDataController {
    private final UserDataService userDataService;
    @PostMapping
    public UserData addWorkout(@RequestBody UserdataDTO userdata ) {
        return userDataService.addUserData(userdata);
    }
}
