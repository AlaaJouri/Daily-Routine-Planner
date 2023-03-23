package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.model.UserdataDTO;
import com.github.alaajouri.backend.repository.UserDataRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.Mockito.*;


class UserDataServiceTest {
    UserDataService userDataService;
    UserDataRepository userDataRepository;
    IdGenerator idGenerator;
    UserData User1;

    @BeforeEach
    public void setUp() {
        userDataRepository = mock(UserDataRepository.class);
        idGenerator = mock(IdGenerator.class);
        userDataService = new UserDataService(userDataRepository, idGenerator);
        User1 = new UserData("1", "Alaa", "women", "55", 50, 8, 3, 1500, 500);

    }

    @Test
    void addUserData() {

        //GIVEN
        when(idGenerator.generateID()).thenReturn("Whatever Id");
        UserData UserWithId = new UserData("Whatever Id", "women", "55", "50", 8, 3, 1500, 500, 1);
        when(userDataRepository.save(UserWithId)).thenReturn(UserWithId);

        //WHEN
        UserData expected = UserWithId;
        UserdataDTO UserdataDTO1 = new UserdataDTO("women", "55", "50", 8, 3, 1500, 500, 1);
        UserData actualTask = userDataService.addUserData(UserdataDTO1);

        //THEN
        verify(userDataRepository).save(UserWithId);
        verify(idGenerator).generateID();

        Assertions.assertEquals(expected, actualTask);

    }

    @Test
    void deleteUserData() {
        userDataRepository.save(User1);
        when(userDataRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> userDataService.deleteUserDataById("1"));
    }
}
