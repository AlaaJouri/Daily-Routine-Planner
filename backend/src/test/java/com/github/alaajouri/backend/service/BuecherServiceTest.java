package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.Buecher;
import com.github.alaajouri.backend.model.BuecherDTO;
import com.github.alaajouri.backend.repository.BuecherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


class BuecherServiceTest {
    BuecherService buecherService;
    BuecherRepository buecherRepository;
    IdGenerator idGenerator;
    Buecher buch1;
    BuecherDTO buecherDTO;

    Buecher buch2;

    @BeforeEach
    public void setUp() {
        buecherRepository = mock(BuecherRepository.class);
        idGenerator = mock(IdGenerator.class);
        buecherService = new BuecherService(buecherRepository, idGenerator);
        buch1 = new Buecher("1", "Buch1", true);
        buecherDTO = new BuecherDTO("Buch1", true);
        buch2 = new Buecher("2", "Buch2", true);

    }

    @Test
    void checkListAllBuecher() {

        //GIVEN
        List<Buecher> expectedBuch = new ArrayList<>();
        expectedBuch.add(new Buecher("1", "Buch1", true));
        expectedBuch.add(new Buecher("2", "Buch2", true));
        when(buecherRepository.findAll()).thenReturn(expectedBuch);

        //WHEN
        List<Buecher> buch = buecherService.listAllBuecher();

        //THEN
        verify(buecherRepository).findAll();
        assertEquals(expectedBuch, buch);

    }

    @Test
    void deleteBuecher() {
        buecherRepository.save(buch1);
        when(buecherRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> buecherService.deleteBuchById("1"));
    }

    @Test
    void getBuchById() {
        // GIVEN
        when(buecherRepository.findById("1")).thenReturn(Optional.empty());

        // WHEN
        assertThrows(NoSuchElementException.class, () -> buecherService.getBuchByID("1"));

        // THEN
        verify(buecherRepository).findById("1");
    }

    @Test
    void checkUpdateBuch() {
        //GIVEN
        when(buecherRepository.existsById(buch1.id())).thenReturn(true);
        when(buecherRepository.save(buch1)).thenReturn(buch1);

        //WHEN
        Buecher actual = buecherService.updateBuch(buch1.id(), buecherDTO);
        Buecher expected = buch1;

        //THEN
        verify(buecherRepository).save(buch1);
        verify(buecherRepository).existsById(buch1.id());
        assertEquals(expected, actual);
    }
}