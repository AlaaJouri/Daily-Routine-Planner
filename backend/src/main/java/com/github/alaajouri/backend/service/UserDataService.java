package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.repository.UserDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserDataService {

    private final UserDataRepository userDataRepository;
    private final IdGenerator idGenerator;

    public UserData addUserData(UserData userData) {
        UserData userDataToAdd = new UserData(
                idGenerator.generateID(),
                userData.name(),
                userData.gender(),
                userData.weight()

        );
        return userDataRepository.save(userDataToAdd);
    }

}
