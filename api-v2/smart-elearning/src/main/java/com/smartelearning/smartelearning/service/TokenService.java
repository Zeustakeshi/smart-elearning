/*
 *  TokenService
 *  @author: minhhieuano
 *  @created 7/9/2025 10:59 PM
 * */

package com.smartelearning.smartelearning.service;

import com.smartelearning.smartelearning.dto.response.TokenPairResponse;
import com.smartelearning.smartelearning.entity.Account;

public interface TokenService {
	TokenPairResponse createTokenPair(Account account);

	TokenPairResponse refreshToken(String refreshToken);
}
