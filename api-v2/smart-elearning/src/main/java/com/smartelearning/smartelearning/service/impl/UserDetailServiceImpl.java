/*
 *  UserDetailServiceImpl
 *  @author: minhhieuano
 *  @created 7/9/2025 10:08 PM
 * */

package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

	private final AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String accountId) throws UsernameNotFoundException {
		return accountRepository
				.findById(accountId)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found!"));
	}
}
