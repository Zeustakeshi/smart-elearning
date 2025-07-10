/*
 *  AccountController
 *  @author: minhhieuano
 *  @created 7/9/2025 11:29 PM
 * */

package com.smartelearning.smartelearning.controller;

import com.smartelearning.smartelearning.dto.common.ApiResponse;
import com.smartelearning.smartelearning.dto.response.AccountResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/me")
    ApiResponse<AccountResponse> getAccount(@AuthenticationPrincipal Account account) {
        return ApiResponse.success(accountService.getAccount(account));
    }
}
