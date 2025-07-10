/*
 *  AccountRepository
 *  @author: minhhieuano
 *  @created 7/9/2025 10:01 PM
 * */

package com.smartelearning.smartelearning.repository;

import com.smartelearning.smartelearning.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    Boolean existsByEmailOrPhoneOrUsername(String email, String phone, String username);

    Page<Account> findAllByEmailLikeIgnoreCase(String email, Pageable pageable);
}
