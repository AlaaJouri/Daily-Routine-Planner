package com.github.alaajouri.backend.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("buch")


public record Buecher(    @Id
                          String id,
                          String title,
                          boolean isChecked ) {

}
