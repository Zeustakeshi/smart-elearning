/*
 *  AccountService
 *  @author: minhhieuano
 *  @created 7/9/2025 11:27 PM
 * */

package com.smartelearning.smartelearning.service;

import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.entity.Account;

public interface AccountService {
    AccountResponse getAccount(Account account);
}
