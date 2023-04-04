package com.github.alaajouri.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

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
        String breakfast,
        String lunch,
        String dinner,
        String snacks,
        Date standup,
        Date sleep


) {
}