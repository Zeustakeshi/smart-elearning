/*
 *  AccountService
 *  @author: minhhieuano
 *  @created 7/9/2025 11:28 PM
 * */

package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.mapper.AccountMapper;
import com.smartelearning.smartelearning.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;

    @Override
    public AccountResponse getAccount(Account account) {
        return accountMapper.toAccountResponse(account);
    }
}
