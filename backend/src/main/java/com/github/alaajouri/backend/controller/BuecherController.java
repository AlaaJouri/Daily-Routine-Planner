package com.github.alaajouri.backend.controller;

import com.github.alaajouri.backend.model.Buecher;
import com.github.alaajouri.backend.model.BuecherDTO;
import com.github.alaajouri.backend.service.BuecherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor

public class BuecherController {

    private final BuecherService buecherService;

    @GetMapping("/book")
    public List<Buecher> buchList() {
        return buecherService.listAllBuecher();
    }

    @PostMapping("/book")
    public Buecher addBuch(@RequestBody Buecher buch) {
        return buecherService.addBuch(buch);
    }

    @GetMapping("/book/{id}")
    Buecher getBuchById(@PathVariable String id) {
        return buecherService.getBuchByID(id);
    }

    @DeleteMapping("book/{id}")
    void deleteBuch(@PathVariable String id) {
        buecherService.deleteBuchById(id);
    }

    @PutMapping("/book/{id}")
    public Buecher updateSleep(@PathVariable String id, @RequestBody BuecherDTO buchToChange) {
        return buecherService.updateBuch(id, buchToChange);
    }

}
