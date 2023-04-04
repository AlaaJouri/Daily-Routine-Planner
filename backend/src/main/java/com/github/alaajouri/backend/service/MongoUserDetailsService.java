package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
import com.github.alaajouri.backend.model.MongoUserWithoutIDDTO;
import com.github.alaajouri.backend.repository.MongoUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;
import java.util.Date;


import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;


    public MongoUser getUserDataByID(String id) {
        return mongoUserRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public MongoUser updateUserData(String id, MongoUserWithoutIDDTO userData) {
        Optional<MongoUser> optionalUserData = mongoUserRepository.findById(id);

        if (optionalUserData.isEmpty()) {
            throw new NoSuchElementException("UserData with id " + id + " doesn't exist");
        }

        MongoUser updatedUserData = new MongoUser(
                id,
                userData.username(),
                userData.password(),
                userData.role(),
                userData.name(),
                userData.gender(),
                userData.weight(),
                userData.weightGoal(),
                userData.sleepTimeTarget(),
                userData.trainingTimeGoal(),
                userData.stepTarget(),
                userData.caloriesBurnedTarget(),
                userData.steps(),
                userData.burnedCalories(),
                userData.trainingTimes(),
                userData.breakfast(),
                userData.lunch(),
                userData.dinner(),
                userData.snacks(),
                userData.standup(),
                userData.sleep()
        );

        return mongoUserRepository.save(updatedUserData);
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new User(
                mongoUser.username(),
                mongoUser.password(),
                List.of(new SimpleGrantedAuthority("ROLE_" + mongoUser.role()))
        );
    }
    public MongoUser getMe(Principal principal) {
        MongoUser me = mongoUserRepository
                .findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        return new MongoUser(
                me.id(),
                me.username(),
                me.password(),
                me.role(),
                me.name(),
                me.gender(),
                me.weight(),
                me.weightGoal(),
                me.sleepTimeTarget(),
                me.trainingTimeGoal(),
                me.stepTarget(),
                me.caloriesBurnedTarget(),
                me.steps(),
                me.burnedCalories(),
                me.trainingTimes(),
                me.breakfast(),
                me.lunch(),
                me.dinner(),
                me.snacks(),
                me.standup(),
                me.sleep()
        );}
    public MongoUser create(MongoUserDTO user) {
        if (user.username() == null || user.username().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }

        if (user.password() == null || user.password().length() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if (mongoUserRepository.existsByUsername(user.username())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "User already exists"
            );
        }
Date now=new Date();
        MongoUser newUser = new MongoUser(
                UUID.randomUUID().toString(),
                user.username(),
                passwordEncoder.encode(user.password()),
                "BASIC",
                " ",
                " ",
                " ",
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                " " ,
                " ",
                " ",
                " ",
                now,
                now




        );

        MongoUser out = mongoUserRepository.save(newUser);

        return new MongoUser(
                out.id(),
                out.username(),
                null,
                out.role(),
                out.name(),
                out.gender(),
                out.weight(),
                out.weightGoal(),
                out.sleepTimeTarget(),
                out.trainingTimeGoal(),
                out.stepTarget(),
                out.caloriesBurnedTarget(),
                out.steps(),
                out.burnedCalories(),
                out.trainingTimes(),
                out.breakfast(),
                out.lunch(),
                out.dinner(),
                out.snacks(),
                out.standup(),
                out.sleep()

        );
    }

}