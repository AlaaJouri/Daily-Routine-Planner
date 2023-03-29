package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class MongoUserDetailsServiceTest {
    PasswordEncoder passwordEncoder;
    MongoUserDetailsService mongoUserDetailsService;
    MongoUserRepository mongoUserRepository;
    IdGenerator idGenerator;
    MongoUser mongoUser;

    @BeforeEach
    void setUp() {
        mongoUserRepository = mock(MongoUserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        idGenerator = mock(IdGenerator.class);
        mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository, passwordEncoder);
          mongoUser = new MongoUser("1", "username", "123", "BASIC", "Alaa", "W", "55", 50, 50, 8, 3, 1500);
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
    public void testCreate() {
        // Arrange
        MongoUserDTO user = new MongoUserDTO("john_doe","password");



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
}

