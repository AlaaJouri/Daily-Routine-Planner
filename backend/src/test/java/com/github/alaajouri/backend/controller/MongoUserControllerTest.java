package com.github.alaajouri.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import com.github.alaajouri.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;


import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {


    @Autowired
    MongoUserRepository mongoUserRepository;
    TestRestTemplate restTemplate;
    @Autowired
    MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    MockMvc mockMvc;

    MongoUser mongoUser;

    @BeforeEach
    void setUp() {
        mongoUser = new MongoUser("1", "user", "password", "BASIC", "Alaa", "W", "55", 50, 50, 8, 3, 1500);

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void getMe_whenAuthenticated_thenUsername() throws Exception {
        mongoUserRepository.save(mongoUser);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/me")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user"))
                .andExpect(jsonPath("$.password").isEmpty());


    }


    @Test
    @DirtiesContext
    void getStatus401ifUserIsNotAuthenticatedAdmin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/admin")
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }


    @Test
    @DirtiesContext
    void createUserWithoutUsername_ThenBadRequest400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "",
                                    "password": "test"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void createUserWithoutPassword_ThenBadRequest400() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": ""
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }


    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void loginUserWithValidUsernameAndPassword_Then200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "username": "user",
                            "password": "password"
                        }
                        """));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void login_whenUserCredentialsInvalid_whenStatusUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}")
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }


    @Test
    @DirtiesContext
    void loginUserWithInvalidUsernameAndPassword_Then401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "lolll",
                                    "password": "passworddd"
                                }
                                """))

                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void logoutUser_Then200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/logout")
                        .with(csrf()))
                .andExpect(status().isOk());

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void testGetStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user"))
                .andExpect(status().isOk())
                .andExpect(content().string("OK"));
    }
    /*
    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    public void updateUserDataTest() throws Exception {
        // Arrange


        MongoUserDTO userDto = new MongoUserDTO("user", "password");

        MongoUser updatedUser = new MongoUser("1", userDto.username(), userDto.password(), "user", "Test User",
                "male", "75", 70, 8, 60, 10000, 2500);
        mongoUserRepository.save(updatedUser);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/1") .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.username").value(userDto.username()))
                .andExpect(jsonPath("$.password").value(userDto.password()))
                .andExpect(jsonPath("$.role").value("user"))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.gender").value("male"))
                .andExpect(jsonPath("$.weight").value("75"))
                .andExpect(jsonPath("$.weightGoal").value(70))
                .andExpect(jsonPath("$.sleepTimeTarget").value(8))
                .andExpect(jsonPath("$.trainingTimeGoal").value(60))
                .andExpect(jsonPath("$.stepTarget").value(10000))
                .andExpect(jsonPath("$.caloriesBurnedTarget").value(2500));
    }
*/






        }













