package com.github.alaajouri.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongoUser")
public record MongoUser(
        @Id
        String id,
        String username,
        String password,
        String role,
        String name,
        String gender,
        String weight,
        int weightGoal,
        int sleepTimeTarget,
        int trainingTimeGoal,
        int stepTarget,
        int caloriesBurnedTarget,
        int steps,
        int burnedCalories,
        int trainingTimes,
        String Breakfast,
        String Lunch,
        String Dinner,
        String snacks


) {
}