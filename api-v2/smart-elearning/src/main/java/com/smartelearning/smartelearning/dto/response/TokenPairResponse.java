/*
 *  TokenPairResponse
 *  @author: minhhieuano
 *  @created 7/9/2025 10:48 PM
 * */

package com.smartelearning.smartelearning.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenPairResponse {
	private TokenResponse accessToken;
	private TokenResponse refreshToken;
}
