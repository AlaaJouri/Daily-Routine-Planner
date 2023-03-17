package com.github.alaajouri.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("user")
public record UserData(
        @Id
        String id,
        String name,
        String gender,
        String weight

) {
}
