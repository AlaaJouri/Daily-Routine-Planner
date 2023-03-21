package com.github.alaajouri.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class IdGeneratorTest {


    IdGenerator idGenerator = new IdGenerator();

    @Test
    void generateID() {
        assertNotNull(idGenerator.generateID());
    }

}
