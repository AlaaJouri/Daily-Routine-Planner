package com.github.alaajouri.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public record DTOUserData(
        String name,
        String gender,
        String weight,
        int weightGoal,
        int sleepTimeTarget,
        int trainingTimeGoal,
        int stepTarget,
        int caloriesBurnedTarget) {


}
