/*
 *  RefreshTokenRequest
 *  @author: minhhieuano
 *  @created 7/10/2025 1:50 PM
 * */


package com.smartelearning.smartelearning.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
    @NotBlank
    private String refreshToken;
}
