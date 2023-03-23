package com.github.alaajouri.backend.model;

public record MongoUser(

        String id,
        String username,
        String password,
        String role

) {
}