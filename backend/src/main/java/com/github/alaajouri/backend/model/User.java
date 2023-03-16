package com.github.alaajouri.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public record User(
        // @Id
        String id,
        String name,
        String geschlecht,
        int grosse,
        int gewichtziel,
        int schlafziel,
        int traningzeitziel,
        int verbranntenKalorZiel,
        int Schrittenziel,
        int gewicht,
        int schlafen,
        int wachen,
        int traningzeit,
        int verbranntenKalor,
        int Schritten


) {
}
