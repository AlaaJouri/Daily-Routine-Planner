package com.github.alaajouri.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.service.UserDataService;
import com.github.alaajouri.backend.model.UserdataDTO;

import java.util.List;

@RestController
@RequestMapping("/api/userdata/")
@RequiredArgsConstructor
public class UserDataController {
    private final UserDataService userDataService;
    @GetMapping
    public List<UserData> userdataList() {
        return userDataService.listAllUserdata();
    }
    @PostMapping
    public UserData addUserData(@RequestBody UserdataDTO userdata) {
        return userDataService.addUserData(userdata);
    }

    @DeleteMapping("{id}")
    void deleteUserData(@PathVariable String id) {
        userDataService.deleteUserDataById(id);
    }
    @GetMapping("{id}")
    UserData getUserDataById(@PathVariable String id) {
        return userDataService.getUserDataByID(id);
    }
}
