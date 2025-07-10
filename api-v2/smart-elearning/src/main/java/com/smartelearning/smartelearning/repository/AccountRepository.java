/*
 *  AccountRepository
 *  @author: minhhieuano
 *  @created 7/9/2025 10:01 PM
 * */

package com.smartelearning.smartelearning.repository;

import com.smartelearning.smartelearning.entity.Account;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
	Optional<Account> findByUsername(String username);

	Boolean existsByEmailOrPhoneOrUsername(String email, String phone, String username);
}
