package com.github.alaajouri.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserWithoutIDDTO;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import com.github.alaajouri.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {


    @Autowired
    MongoUserRepository mongoUserRepository;
    @Autowired
    MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    MockMvc mockMvc;

    MongoUser mongoUser;
    MongoUserWithoutIDDTO mongoUserWithoutIDDTO;

    @BeforeEach
    void setUp() {
        mongoUser = new MongoUser("1", "user", "password", "BASIC", "Alaa", "W", "55", 50, 50, 8, 3, 1500,0,0,0);

        mongoUserWithoutIDDTO = new MongoUserWithoutIDDTO("user", "password", "BASIC", "Alaa", "W", "55", 50, 50, 8, 3, 1500,0,0,0);

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
                .andExpect(jsonPath("$.password").isNotEmpty());
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

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void testUpdateUserData() throws Exception {

        // Prepare test data
        String id = "1";
        mongoUserRepository.save(mongoUser);
        MongoUserWithoutIDDTO userData = new MongoUserWithoutIDDTO("testuser", "password", "ROLE_USER",
                "Test User", "M", "70", 2000, 8, 60, 10000, 500,0,0,0);

        // Perform request and verify response

        mockMvc.perform(put("/api/user/" + id)
                        .contentType(MediaType.APPLICATION_JSON).with(csrf())
                        .content(new ObjectMapper().writeValueAsString(userData)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(userData.username()))
                .andExpect(jsonPath("$.name").value(userData.name()))
                .andExpect(jsonPath("$.gender").value(userData.gender()))
                .andExpect(jsonPath("$.weight").value(userData.weight()))
                .andExpect(jsonPath("$.weightGoal").value(userData.weightGoal()))
                .andExpect(jsonPath("$.sleepTimeTarget").value(userData.sleepTimeTarget()))
                .andExpect(jsonPath("$.trainingTimeGoal").value(userData.trainingTimeGoal()))
                .andExpect(jsonPath("$.stepTarget").value(userData.stepTarget()))
                .andExpect(jsonPath("$.caloriesBurnedTarget").value(userData.caloriesBurnedTarget()));
    }

}













