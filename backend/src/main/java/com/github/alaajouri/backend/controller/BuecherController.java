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

    @GetMapping("/Buecher")
    public List<Buecher> buchList() {
        return BuecherService.listAllBuecher();
    }

    @PostMapping("/Buecher")
    public Buecher addBuch(@RequestBody Buecher buch) {
        return BuecherService.addBuch(buch);
    }

    @GetMapping("/Buecher/{id}")
    Buecher getBuchById(@PathVariable String id) {
        return BuecherService.getBuchByID(id);
    }

    @DeleteMapping("Buecher/{id}")
    void deleteBuch(@PathVariable String id) {
        BuecherService.deleteBuchById(id);
    }

    @PutMapping("/Buecher/{id}")
    public Buecher updateSleep(@PathVariable String id, @RequestBody Buecher buchToChange) {
        return BuecherService.updateBuch(id, buchToChange);
    }

}
