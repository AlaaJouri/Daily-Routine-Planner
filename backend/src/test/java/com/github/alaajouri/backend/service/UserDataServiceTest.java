package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.UserData;
import com.github.alaajouri.backend.repository.UserDataRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.Mockito.*;


class UserDataServiceTest {

    UserDataService userDataService;
    UserDataRepository userDataRepository;
    IdGenerator idGenerator;

    @BeforeEach
    public void setUp() {
        userDataRepository = mock(UserDataRepository.class);
        idGenerator = mock(IdGenerator.class);
        userDataService = new UserDataService(userDataRepository, idGenerator);
    }

    @Test
    void addUserData() {


        //GIVEN
        UserData expectedUserData = new UserData("1", "Alaa", "women", "55",50,8,3,1500,500);
        when(idGenerator.generateID()).thenReturn("1");
        when(userDataRepository.save(expectedUserData)).thenReturn(expectedUserData);


        //WHEN
        UserData userData = userDataService.addUserData(expectedUserData);

        //THEN
        verify(userDataRepository).save(expectedUserData);
        assertEquals(expectedUserData, userData);
    }
}
