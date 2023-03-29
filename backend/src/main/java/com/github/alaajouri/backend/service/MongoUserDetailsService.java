package com.github.alaajouri.backend.service;

import com.github.alaajouri.backend.model.MongoUser;
import com.github.alaajouri.backend.model.MongoUserDTO;
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


import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;
    

    public MongoUser getUserDataByID(String id) {
        return mongoUserRepository.findById(id).orElseThrow(NoSuchElementException::new);
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
                null,
                me.role(),
                me.name(),
                me.gender(),
                me.weight(),
                me.weightGoal(),
                me.sleepTimeTarget(),
                me.trainingTimeGoal(),
                me.stepTarget(),
                me.caloriesBurnedTarget()
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
                0


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
                out.caloriesBurnedTarget()


        );
    }
}
