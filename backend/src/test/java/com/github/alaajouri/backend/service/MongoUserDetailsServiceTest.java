package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
import com.github.alaajouri.backend.model.MongoUserWithoutIDDTO;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.AdditionalAnswers;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertThrows;

class MongoUserDetailsServiceTest {
    PasswordEncoder passwordEncoder;
    MongoUserDetailsService mongoUserDetailsService;
    MongoUserRepository mongoUserRepository;
    IdGenerator idGenerator;
    MongoUser mongoUser;
    MongoUserDTO mongoUserDTO;
    MongoUserDTO newUserData;
    MongoUser existingUserData;

    @BeforeEach
    void setUp() {
        mongoUserRepository = mock(MongoUserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        idGenerator = mock(IdGenerator.class);
        mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository, passwordEncoder);
        mongoUser = new MongoUser("1", "username", "123", "BASIC", "Alaa", "W", "55", 50, 50, 8, 3, 1500);
        mongoUserDTO = new MongoUserDTO("username", "123");
        newUserData = new MongoUserDTO("newUsername", "newPassword");
        existingUserData = new MongoUser(
                "123",
                "oldUsername",
                "oldPassword",
                "user",
                "John Doe",
                "male",
                "70",
                2000,
                7,
                30,
                10000,
                500
        );
    }

    @Test
    void testUpdateUserData() {
        // Prepare test data
        String id = "123";
        MongoUserWithoutIDDTO userData = new MongoUserWithoutIDDTO("testuser", "password", "ROLE_USER",
                "Test User", "M", "70", 2000, 8, 60, 10000, 500);

        MongoUser existingUserData = new MongoUser(
                id,
                "olduser",
                "oldpassword",
                "ROLE_USER",
                "Old User",
                "M",
                "75",
                1800,
                7,
                45,
                8000,
                400
        );
        when(mongoUserRepository.findById(id)).thenReturn(Optional.of(existingUserData));
        when(mongoUserRepository.save(any(MongoUser.class))).thenAnswer(AdditionalAnswers.returnsFirstArg());

        // Perform update
        MongoUser updatedUserData = mongoUserDetailsService.updateUserData(id, userData);

        // Verify update result
        assertEquals(id, updatedUserData.id());
        assertEquals(userData.username(), updatedUserData.username());
        assertEquals(userData.password(), updatedUserData.password());
        assertEquals(userData.role(), updatedUserData.role());
        assertEquals(userData.name(), updatedUserData.name());
        assertEquals(userData.gender(), updatedUserData.gender());
        assertEquals(userData.weight(), updatedUserData.weight());
        assertEquals(userData.weightGoal(), updatedUserData.weightGoal());
        assertEquals(userData.sleepTimeTarget(), updatedUserData.sleepTimeTarget());
        assertEquals(userData.trainingTimeGoal(), updatedUserData.trainingTimeGoal());
        assertEquals(userData.stepTarget(), updatedUserData.stepTarget());
        assertEquals(userData.caloriesBurnedTarget(), updatedUserData.caloriesBurnedTarget());

        // Verify that the repository was called
        verify(mongoUserRepository).findById(id);
        verify(mongoUserRepository).save(any(MongoUser.class));
    }

    @Test
    void loadUserByUsername() {
        //GIVEN
        when(mongoUserRepository.findByUsername("username")).thenReturn(Optional.of(mongoUser));
        //WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("username");
        UserDetails expected = new User(mongoUser.username(), mongoUser.password(),
                List.of(new SimpleGrantedAuthority(("ROLE_" + mongoUser.role()))));
        //THEN
        verify(mongoUserRepository).findByUsername("username");
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getUserDataById() {
        // GIVEN
        when(mongoUserRepository.findById("1")).thenReturn(Optional.empty());

        // WHEN
        assertThrows(NoSuchElementException.class, () -> mongoUserDetailsService.getUserDataByID("1"));

        // THEN
        verify(mongoUserRepository).findById("1");
    }

    @Test
    void getMe_withValidPrincipal_returnsMongoUser() {
        // Arrange
        Principal principal = mock(Principal.class);
        when(principal.getName()).thenReturn("testuser");
        MongoUser expected = new MongoUser(
                "1",
                "testuser",
                null,
                "ROLE_USER",
                "Test User",
                "male",
                "70",
                65,
                7,
                60,
                10000,
                500
        );
        when(mongoUserRepository.findByUsername(principal.getName())).thenReturn(Optional.of(expected));

        // Act
        MongoUser result = mongoUserDetailsService.getMe(principal);

        // Assert
        assertNotNull(result);
        assertEquals(expected.id(), result.id());
        assertEquals(expected.username(), result.username());
        assertEquals(expected.role(), result.role());
        assertEquals(expected.name(), result.name());
        assertEquals(expected.gender(), result.gender());
        assertEquals(expected.weight(), result.weight());
        assertEquals(expected.weightGoal(), result.weightGoal());
        assertEquals(expected.sleepTimeTarget(), result.sleepTimeTarget());
        assertEquals(expected.trainingTimeGoal(), result.trainingTimeGoal());
        assertEquals(expected.stepTarget(), result.stepTarget());
        assertEquals(expected.caloriesBurnedTarget(), result.caloriesBurnedTarget());

        // Verify
        verify(mongoUserRepository, times(1)).findByUsername(principal.getName());
    }

    @Test
    void getMe_withInvalidPrincipal_throwsUnauthorizedException() {
        // Arrange
        Principal principal = mock(Principal.class);
        when(principal.getName()).thenReturn("testuser");
        when(mongoUserRepository.findByUsername(principal.getName())).thenReturn(Optional.empty());

        // Act/Assert
        assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.getMe(principal));

        // Verify
        verify(mongoUserRepository, times(1)).findByUsername(principal.getName());
    }

    @Test
    void testCreate() {
        // Arrange
        MongoUserDTO user = new MongoUserDTO("john_doe", "password");


        when(mongoUserRepository.existsByUsername(user.username())).thenReturn(false);


        when(passwordEncoder.encode(user.password())).thenReturn("encoded_password");

        MongoUser expectedUser = new MongoUser(
                "1",
                user.username(),
                "encoded_password",
                "BASIC",
                "",
                "",
                "",
                0,
                0,
                0,
                0,
                0
        );
        when(mongoUserRepository.save(any())).thenReturn(expectedUser);

        MongoUser expectedOutput = new MongoUser(
                expectedUser.id(),
                expectedUser.username(),
                null,
                expectedUser.role(),
                expectedUser.name(),
                expectedUser.gender(),
                expectedUser.weight(),
                expectedUser.weightGoal(),
                expectedUser.sleepTimeTarget(),
                expectedUser.trainingTimeGoal(),
                expectedUser.stepTarget(),
                expectedUser.caloriesBurnedTarget()
        );

        // Act
        MongoUser actualOutput = mongoUserDetailsService.create(user);

        // Assert
        assertEquals(expectedOutput, actualOutput);
        verify(mongoUserRepository).existsByUsername(user.username());
        verify(mongoUserRepository).save(any());
        verify(passwordEncoder).encode(user.password());
    }


    @Test
    void create_withExistingUsername_throwsConflictException() {
        // Arrange
        MongoUserDTO user = new MongoUserDTO(
                "testuser",
                "testpassword"

        );
        when(mongoUserRepository.existsByUsername(user.username())).thenReturn(true);

        // Act/Assert
        assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.create(user));

        // Verify
        verify(mongoUserRepository, times(1)).existsByUsername(user.username());
        verifyNoMoreInteractions(passwordEncoder, mongoUserRepository);
    }

    @Test
    void create_withMissingUsername_throwsBadRequestException() {
        // Arrange
        MongoUserDTO user = new MongoUserDTO(
                null,
                "testpassword"

        );

        // Act/Assert
        assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.create(user));

        // Verify
        verifyNoMoreInteractions(passwordEncoder, mongoUserRepository);
    }

/*
    @Test
    void testUpdateUserData() {
        String id = "1";
        MongoUserDTO userData = new MongoUserDTO("username", "password");

        MongoUser oldUserData = new MongoUser(
                id,
                "old_username",
                "old_password",
                "old_role",
                "old_name",
                "old_gender",
                "old_weight",
                0,
                0,
                0,
                0,
                0
        );

        MongoUser updatedUserData = new MongoUser(
                id,
                userData.username(),
                oldUserData.password(),
                oldUserData.role(),
                oldUserData.name(),
                oldUserData.gender(),
                oldUserData.weight(),
                oldUserData.weightGoal(),
                oldUserData.sleepTimeTarget(),
                oldUserData.trainingTimeGoal(),
                oldUserData.stepTarget(),
                oldUserData.caloriesBurnedTarget()
        );

        // Mock the repository to return the old user data when findById is called with the given ID
        when(mongoUserRepository.findById(id)).thenReturn(Optional.of(oldUserData));

        // Mock the repository to return the updated user data when save is called with the updated user data
        when(mongoUserRepository.save(updatedUserData)).thenReturn(updatedUserData);

        // Call the method and assert that it returns the updated user data
        MongoUser result = mongoUserDetailsService.updateUserData(id, userData);
       Assertions.assertEquals(updatedUserData, result);

        // Verify that the repository was called with the correct ID and the updated user data
        verify(mongoUserRepository).findById(id);
        verify(mongoUserRepository).save(updatedUserData);

        // Assert that the updated user data has the expected field values
        Assertions.assertEquals(updatedUserData.username(), "username");
        Assertions.assertEquals(updatedUserData.password(), "old_password");
        Assertions.assertEquals(updatedUserData.role(), "old_role");
        Assertions.assertEquals(updatedUserData.name(), "old_name");
        Assertions.assertEquals(updatedUserData.gender(), "old_gender");
        Assertions.assertEquals(updatedUserData.weight(), "old_weight");
        Assertions.assertEquals(updatedUserData.weightGoal(), 0);
        Assertions.assertEquals(updatedUserData.sleepTimeTarget(), 0);
        Assertions.assertEquals(updatedUserData.trainingTimeGoal(), 0);
        Assertions.assertEquals(updatedUserData.stepTarget(), 0);
        Assertions.assertEquals(updatedUserData.caloriesBurnedTarget(), 0);
    }




    @Test
    void testUpdateUserDataThrowsNoSuchElementException() {
        String id = "1";
        MongoUserDTO userData = new MongoUserDTO("username", "password");

        // Mock the repository to return an empty optional when findById is called with the given ID
        when(mongoUserRepository.findById(id)).thenReturn(Optional.empty());

        // Call the method and assert that it throws a NoSuchElementException
        Assertions.assertThrows(
                NoSuchElementException.class,
                () -> mongoUserDetailsService.updateUserData(id, userData)
        );

        // Verify that the repository was called with the correct ID
        verify(mongoUserRepository).findById(id);

        // Verify that the repository was not called with any arguments for the save method
        verify(mongoUserRepository, never()).save(any());
    }*/
}









