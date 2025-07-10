/*
 *  AuthServiceImpl
 *  @author: minhhieuano
 *  @created 7/9/2025 10:50 PM
 * */

package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.common.enums.ErrorCode;
import com.smartelearning.smartelearning.common.enums.Role;
import com.smartelearning.smartelearning.dto.request.CreateAccountRequest;
import com.smartelearning.smartelearning.dto.request.LoginRequest;
import com.smartelearning.smartelearning.dto.response.TokenPairResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.exceptions.ApiException;
import com.smartelearning.smartelearning.mapper.AccountMapper;
import com.smartelearning.smartelearning.repository.AccountRepository;
import com.smartelearning.smartelearning.service.AuthService;
import com.smartelearning.smartelearning.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final AccountRepository accountRepository;
	private final AccountMapper accountMapper = AccountMapper.INSTANCE;
	private final TokenService tokenService;
	private final PasswordEncoder passwordEncoder;

	@Value("${resources.default-avatar.student}")
	private String defaultStudentAvatar;

	@Value("${resources.default-avatar.student}")
	private String defaultTeacherAvatar;

	@Override
	public TokenPairResponse createAccount(CreateAccountRequest request) {
		if (accountRepository.existsByEmailOrPhoneOrUsername(
				request.getEmail(), request.getPhone(), request.getUsername())) {
			throw new ApiException(ErrorCode.EMAIL_OR_PHONE_OR_USERNAME_ALREADY_EXISTED);
		}

		Account account = accountMapper.toAccount(request);
		account.setPassword(passwordEncoder.encode(request.getPassword()));

		if (request.getAccountType().equals("TEACHER")) {
			account.setRole(Role.TEACHER);
			account.setAvatar(defaultTeacherAvatar);
		} else {
			account.setRole(Role.STUDENT);
			account.setAvatar(defaultStudentAvatar);
		}

		accountRepository.save(account);
		return tokenService.createTokenPair(account);
	}

	@Override
	public TokenPairResponse login(LoginRequest request) {

		Account account = accountRepository
				.findByUsername(request.getUsername())
				.orElseThrow(() -> new ApiException(ErrorCode.INVALID_USERNAME_OR_PASSWORD));

		if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
			throw new ApiException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
		}

		return tokenService.createTokenPair(account);
	}
}
