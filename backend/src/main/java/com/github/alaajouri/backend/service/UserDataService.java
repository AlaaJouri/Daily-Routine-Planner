package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.model.UserdataDTO;
import com.github.alaajouri.backend.repository.UserDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserDataService {

    private final UserDataRepository userDataRepository;
    private final IdGenerator idGenerator;
    public List<UserData> listAllUserdata() {
        return userDataRepository.findAll();
    }
    public UserData addUserData(UserdataDTO userData) {
        UserData userDataToAdd = new UserData(
                idGenerator.generateID(),
                userData.name(),
                userData.gender(),
                userData.weight(),
                userData.weightGoal(),
                userData.sleepTimeTarget(),
                userData.trainingTimeGoal(),
                userData.stepTarget(),
                userData.caloriesBurnedTarget()
        );
        return userDataRepository.save(userDataToAdd);
    }
    public UserData getUserDataByID(String id) {
        return userDataRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }
    public void deleteUserDataById(String id) {
        Optional<UserData> userDataToDelete = userDataRepository.findById(id);
        if (userDataToDelete.isEmpty()) {
            throw new NoSuchElementException();
        } else {
            userDataRepository.deleteById(id);

        }
    }
}
