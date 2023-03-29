package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

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
        mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);
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
}