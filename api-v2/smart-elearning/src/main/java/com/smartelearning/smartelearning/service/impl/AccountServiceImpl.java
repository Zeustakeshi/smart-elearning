/*
 *  AccountService
 *  @author: minhhieuano
 *  @created 7/9/2025 11:28 PM
 * */

package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.dto.response.AccountPublicInfoResponse;
import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.dto.response.PageResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.mapper.AccountMapper;
import com.smartelearning.smartelearning.mapper.PageMapper;
import com.smartelearning.smartelearning.repository.AccountRepository;
import com.smartelearning.smartelearning.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;
    private final PageMapper pageMapper = PageMapper.INSTANCE;
    private final AccountRepository accountRepository;

    @Override
    public AccountResponse getAccount(Account account) {
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public PageResponse<AccountPublicInfoResponse> findAccountByEmail(String email, int page, int limit, Account account) {
        PageRequest request = PageRequest.of(page, limit);
        Page<Account> accounts = accountRepository.findAllByEmailLikeIgnoreCase(email, request);

        List<AccountPublicInfoResponse> accountResponsesList = accounts
                .stream()
                .map(accountMapper::toAccountPublicInfoResponse)
                .filter(acc -> !acc.getEmail().equals(email))
                .toList();

        Page<AccountPublicInfoResponse> accountResponses = new PageImpl<>(
                accountResponsesList,
                accounts.getPageable(),
                accountResponsesList.size()
        );

        return pageMapper.toPageableResponse(accountResponses);
    }
}
