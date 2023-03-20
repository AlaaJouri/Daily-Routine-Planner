package com.github.alaajouri.backend.model;

public record UserdataDTO(
        String name,
        String gender,
        String weight,
        int weightGoal,
        int sleepTimeTarget,
        int trainingTimeGoal,
        int stepTarget,
        int caloriesBurnedTarget) {


}
