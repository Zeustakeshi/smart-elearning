/*
 *  AuthService
 *  @author: minhhieuano
 *  @created 7/9/2025 10:43 PM
 * */

package com.smartelearning.smartelearning.service;

import com.smartelearning.smartelearning.dto.request.CreateAccountRequest;
import com.smartelearning.smartelearning.dto.request.LoginRequest;
import com.smartelearning.smartelearning.dto.response.TokenPairResponse;

public interface AuthService {
    TokenPairResponse createAccount(CreateAccountRequest request);

    TokenPairResponse login(LoginRequest request);
}
