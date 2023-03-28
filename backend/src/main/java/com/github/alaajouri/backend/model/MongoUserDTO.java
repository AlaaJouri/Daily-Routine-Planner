package com.github.alaajouri.backend.model;

public record MongoUserDTO(
        String id,
        String username,
        String role,
        String name,
        String gender,
        String weight,
        int weightGoal,
        int sleepTimeTarget,
        int trainingTimeGoal,
        int stepTarget,
        int caloriesBurnedTarget) {

}
