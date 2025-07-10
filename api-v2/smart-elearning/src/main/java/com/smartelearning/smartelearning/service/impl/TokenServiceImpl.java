/*
 *  TokenServiceImpl
 *  @author: minhhieuano
 *  @created 7/9/2025 11:00 PM
 * */

package com.smartelearning.smartelearning.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.smartelearning.smartelearning.common.enums.ErrorCode;
import com.smartelearning.smartelearning.common.enums.TokenType;
import com.smartelearning.smartelearning.common.properties.AccessTokenProperties;
import com.smartelearning.smartelearning.common.properties.RefreshTokenProperties;
import com.smartelearning.smartelearning.dto.response.TokenPairResponse;
import com.smartelearning.smartelearning.dto.response.TokenResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.exceptions.ApiException;
import com.smartelearning.smartelearning.repository.AccountRepository;
import com.smartelearning.smartelearning.service.TokenService;
import java.time.Duration;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {
	private static final String TOKEN_TYPE_KEY = "token_type";
	private static final String TOKEN_ID_KEY = "token_id";
	private final AccessTokenProperties accessTokenProperties;
	private final RefreshTokenProperties refreshTokenProperties;
	private final JwtEncoder accessTokenEncoder;
	private final JwtEncoder refreshTokenEncoder;
	private final JwtDecoder refreshTokenDecoder;
	private final AccountRepository accountRepository;

	public TokenServiceImpl(
			AccessTokenProperties accessTokenProperties,
			RefreshTokenProperties refreshTokenProperties,
			@Qualifier("access_token_encoder") JwtEncoder accessTokenEncoder,
			@Qualifier("refresh_token_encoder") JwtEncoder refreshTokenEncoder,
			@Qualifier("refresh_token_decoder") JwtDecoder refreshTokenDecoder,
			AccountRepository accountRepository) {
		this.accessTokenProperties = accessTokenProperties;
		this.refreshTokenProperties = refreshTokenProperties;
		this.accessTokenEncoder = accessTokenEncoder;
		this.refreshTokenEncoder = refreshTokenEncoder;
		this.refreshTokenDecoder = refreshTokenDecoder;
		this.accountRepository = accountRepository;
	}

	@Override
	public TokenPairResponse createTokenPair(Account account) {
		return TokenPairResponse.builder()
				.accessToken(createAccessToken(account))
				.refreshToken(createRefreshToken(account))
				.build();
	}

	public TokenPairResponse refreshToken(String refreshToken) {
		Jwt jwt = refreshTokenDecoder.decode(refreshToken);
		TokenType tokenType = TokenType.valueOf(jwt.getClaim(TOKEN_TYPE_KEY));

		if (tokenType != TokenType.REFRESH_TOKEN) {
			throw new ApiException(ErrorCode.INVALID_TOKEN_TYPE);
		}

		String accountId = jwt.getSubject();

		Account account =
				accountRepository.findById(accountId).orElseThrow(() -> new ApiException(ErrorCode.ACCOUNT_NOT_FOUND));
		return createTokenPair(account);
	}

	private TokenResponse createAccessToken(Account account) {
		Instant now = Instant.now();
		Instant expireTime = now.plus(Duration.ofHours(accessTokenProperties.expireIn()));
		String tokenId = NanoIdUtils.randomNanoId();

		JwtClaimsSet claimsSet = JwtClaimsSet.builder()
				.subject(account.getId())
				.claim("email", account.getEmail())
				.claim("scope", account.getAuthorities())
				.claim(TOKEN_TYPE_KEY, TokenType.ACCESS_TOKEN)
				.claim(TOKEN_ID_KEY, tokenId)
				.expiresAt(expireTime)
				.build();

		String token = accessTokenEncoder
				.encode(JwtEncoderParameters.from(
						JwsHeader.with(MacAlgorithm.HS256).build(), claimsSet))
				.getTokenValue();

		return TokenResponse.builder()
				.id(tokenId)
				.content(token)
				.expiredTime(expireTime)
				.build();
	}

	private TokenResponse createRefreshToken(Account account) {
		Instant now = Instant.now();
		Instant expireTime = now.plus(Duration.ofHours(refreshTokenProperties.expireIn()));
		String tokenId = NanoIdUtils.randomNanoId();

		JwtClaimsSet claimsSet = JwtClaimsSet.builder()
				.subject(account.getId())
				.claim(TOKEN_TYPE_KEY, TokenType.REFRESH_TOKEN)
				.claim(TOKEN_ID_KEY, tokenId)
				.expiresAt(expireTime)
				.build();

		String token = refreshTokenEncoder
				.encode(JwtEncoderParameters.from(
						JwsHeader.with(MacAlgorithm.HS256).build(), claimsSet))
				.getTokenValue();

		return TokenResponse.builder()
				.id(tokenId)
				.content(token)
				.expiredTime(expireTime)
				.build();
	}
}
