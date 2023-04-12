package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.BuecherDTO;
import com.github.alaajouri.backend.repository.BuecherRepository;
import lombok.AllArgsConstructor;
import com.github.alaajouri.backend.model.Buecher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@AllArgsConstructor
@Service
public class BuecherService {

    private final BuecherRepository buecherRepository;
    private final IdGenerator idGenerator;

    public List<Buecher> listAllBuecher() {
        return buecherRepository.findAll();
    }

    public Buecher addBuch(BuecherDTO buch) {
        Buecher buchToAdd = new Buecher(
                idGenerator.generateID(),
                buch.title(),
                buch.isChecked()
        );
        return buecherRepository.save(buchToAdd);
    }

    public Buecher getBuchByID(String id) {
        return buecherRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public void deleteBuchById(String id) {
        Optional<Buecher> buchToDelete = buecherRepository.findById(id);
        if (buchToDelete.isEmpty()) {
            throw new NoSuchElementException();
        } else {
            buecherRepository.deleteById(id);

        }
    }

    public Buecher updateBuch(String id, BuecherDTO buchToChange) {
        if (!buecherRepository.existsById(id)) {
            throw new NoSuchElementException(id);
        }
        buecherRepository.deleteById(id);
        Buecher updateBuch = new Buecher(id, buchToChange.title(), buchToChange.isChecked());

        return buecherRepository.save(updateBuch);

    }

}

