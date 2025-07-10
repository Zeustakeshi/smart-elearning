/*
 *  AccountService
 *  @author: minhhieuano
 *  @created 7/9/2025 11:27 PM
 * */

package com.smartelearning.smartelearning.service;

import com.smartelearning.smartelearning.dto.response.AccountPublicInfoResponse;
import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.dto.response.PageResponse;
import com.smartelearning.smartelearning.entity.Account;

public interface AccountService {
    AccountResponse getAccount(Account account);

    PageResponse<AccountPublicInfoResponse> findAccountByEmail(String email, int page, int limit, Account account);
}
