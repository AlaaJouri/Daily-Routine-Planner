package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.UserData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.github.alaajouri.backend.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.annotation.DirtiesContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class UserDataControllerTest {
    @Autowired
    UserDataRepository userDataRepository;

    @Autowired
    MockMvc mockMvc;
    UserData User1;

    @BeforeEach
    void setUp() {
        User1 = new UserData("1", "Alaa", "women", "55", 50, 8, 3, 1500, 500);
    }

    @Test
    @DirtiesContext
    void addUserData() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/userdata/").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {                    
                                "name": "Alaa",
                                "gender": "women",
                                "weight": "55",
                                "weightGoal": 50,
                                "sleepTimeTarget": 8,
                                "trainingTimeGoal":3 ,
                                "stepTarget":1500 ,
                                "caloriesBurnedTarget":500 
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                    {                       
                                "name": "Alaa",
                                "gender": "women",
                                "weight": "55",
                                "weightGoal": 50,
                                "sleepTimeTarget": 8,
                                "trainingTimeGoal":3 ,
                                "stepTarget":1500 ,
                                "caloriesBurnedTarget":500 
                                    }
                                    """)
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void deleteUserData() throws Exception {
        // GIVEN
        userDataRepository.save(User1);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/userdata/" + User1.id()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void getUserDataById() throws Exception {
        // GIVEN
        userDataRepository.save(User1);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/userdata/" + User1.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {                    
                                "name": "Alaa",
                                "gender": "women",
                                "weight": "55",
                                "weightGoal": 50,
                                "sleepTimeTarget": 8,
                                "trainingTimeGoal":3 ,
                                "stepTarget":1500 ,
                                "caloriesBurnedTarget":500 
                         }
                         """));
    }
}