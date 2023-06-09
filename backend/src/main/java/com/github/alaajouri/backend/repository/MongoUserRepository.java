package com.github.alaajouri.backend.repository;

import com.github.alaajouri.backend.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoUserRepository extends MongoRepository<MongoUser, String> {
    Optional<MongoUser> findByUsername(String username);

    boolean existsByUsername(String username);
}