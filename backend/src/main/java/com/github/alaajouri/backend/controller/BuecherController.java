package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.Buecher;
import com.github.alaajouri.backend.service.BuecherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor

public class BuecherController {

    private final BuecherService BuecherService;

    @GetMapping("/book")
    public List<Buecher> buchList() {
        return BuecherService.listAllBuecher();
    }

    @PostMapping("/book")
    public Buecher addBook(@RequestBody Buecher buch) {
        return BuecherService.addBook(buch);
    }

    @GetMapping("/book/{id}")
    Buecher getBuchById(@PathVariable String id) {
        return BuecherService.getBuchByID(id);
    }

    @DeleteMapping("book/{id}")
    void deleteBuch(@PathVariable String id) {
        BuecherService.deleteBuchById(id);
    }

    @PutMapping("/book/{id}")
    public Buecher updateSleep(@PathVariable String id, @RequestBody Buecher buchToChange) {
        return BuecherService.updateBuch(id, buchToChange);
    }

}
