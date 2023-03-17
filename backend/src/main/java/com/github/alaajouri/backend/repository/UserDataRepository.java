package com.github.alaajouri.backend.repository;

import com.github.alaajouri.backend.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserDataRepository extends MongoRepository<UserData, String> {


}
