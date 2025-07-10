/*
 *  JwtAuthenticationConverter
 *  @author: minhhieuano
 *  @created 7/9/2025 10:04 PM
 * */

package com.smartelearning.smartelearning.security;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

	private final UserDetailsService userDetailsService;

	@Override
	public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
		String accountId = jwt.getSubject();
		UserDetails account = userDetailsService.loadUserByUsername(accountId);
		return new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
	}
}
