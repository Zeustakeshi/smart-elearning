/*
 *  AuthController
 *  @author: minhhieuano
 *  @created 7/9/2025 10:29 PM
 * */

package com.smartelearning.smartelearning.controller;

import com.smartelearning.smartelearning.dto.common.ApiResponse;
import com.smartelearning.smartelearning.dto.request.CreateAccountRequest;
import com.smartelearning.smartelearning.dto.request.LoginRequest;
import com.smartelearning.smartelearning.dto.response.TokenPairResponse;
import com.smartelearning.smartelearning.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("/register")
	ApiResponse<TokenPairResponse> createAccount(@RequestBody @Valid CreateAccountRequest request) {
		return ApiResponse.success(authService.createAccount(request));
	}

	@PostMapping("/login")
	ApiResponse<TokenPairResponse> login(@RequestBody @Valid LoginRequest request) {
		return ApiResponse.success(authService.login(request));
	}
}
