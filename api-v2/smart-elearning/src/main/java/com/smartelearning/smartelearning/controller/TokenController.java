/*
 *  TokenController
 *  @author: minhhieuano
 *  @created 7/10/2025 1:51 PM
 * */


package com.smartelearning.smartelearning.controller;

import com.smartelearning.smartelearning.dto.common.ApiResponse;
import com.smartelearning.smartelearning.dto.request.RefreshTokenRequest;
import com.smartelearning.smartelearning.dto.response.TokenPairResponse;
import com.smartelearning.smartelearning.service.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/auth/token")
@RequiredArgsConstructor
public class TokenController {
    private final TokenService tokenService;

    @PostMapping("/refresh")
    public ApiResponse<TokenPairResponse> refreshToken(
            @RequestBody @Valid RefreshTokenRequest request
    ) {
        String refreshToken = request.getRefreshToken();
        return ApiResponse.success(tokenService.refreshToken(refreshToken));
    }
}
