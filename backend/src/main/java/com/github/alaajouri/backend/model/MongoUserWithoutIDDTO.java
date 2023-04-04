package com.github.alaajouri.backend.model;

import java.util.Date;

public record MongoUserWithoutIDDTO(String username,
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
                                    Date sleep) {
}
