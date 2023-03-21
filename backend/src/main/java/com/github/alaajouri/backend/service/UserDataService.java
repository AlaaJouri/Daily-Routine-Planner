package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.model.UserdataDTO;
import com.github.alaajouri.backend.repository.UserDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserDataService {

    private final UserDataRepository userDataRepository;
    private final IdGenerator idGenerator;

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
    public void deleteUserDataById(String id) {
        Optional<UserData> workoutToDelete = userDataRepository.findById(id);
        if (workoutToDelete.isEmpty()) {
            throw new NoSuchElementException();
        } else {
            userDataRepository.deleteById(id);

        }
    }
}
