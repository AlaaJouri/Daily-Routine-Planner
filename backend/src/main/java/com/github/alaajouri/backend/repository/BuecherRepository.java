package com.github.alaajouri.backend.repository;


import com.github.alaajouri.backend.model.Buecher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuecherRepository extends MongoRepository<Buecher, String> {


}

