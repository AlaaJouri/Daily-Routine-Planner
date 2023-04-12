package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.Buecher;
import com.github.alaajouri.backend.model.BuecherDTO;
import com.github.alaajouri.backend.repository.BuecherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class BuecherControllerTest {
    @Autowired
    BuecherRepository buecherRepository;

    @Autowired
    MockMvc mockMvc;

    Buecher buch1, buch2;
    BuecherDTO buecherDTO;

    @BeforeEach
    void setUp() {
        buch1 = new Buecher("1", "Buch1", true);
        buecherDTO = new BuecherDTO( "Buch1", true);
        buch2 = new Buecher("2", "Buch2", true);
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void checkListAllBuecher() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/book").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void getBuchById() throws Exception {
        // GIVEN
        buecherRepository.save(buch1);
        buecherRepository.save(buch2);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/book/" + buch1.id()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {            
                         "title": "Buch1",
                         "isChecked": true
                         }
                         """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void deleteBuch() throws Exception {
        // GIVEN
        buecherRepository.save(buch1);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/book/" + buch1.id()).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void checkAddBuch() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/book").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {                     
                                "title": "Buch1",
                         "isChecked": true
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {                       
                                 "title": "Buch1",
                         "isChecked": true
                                }
                                """)
                )
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "password")
    void checkUpdateBuch() throws Exception {
        buecherRepository.save(buch1);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/book/" + "1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id":"1",  "title": "Buch1",
                         "isChecked": true
                                } 
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id":"1",  "title": "Buch1",
                         "isChecked": true
                        }
                        """));
    }
}
