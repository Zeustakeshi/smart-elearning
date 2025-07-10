/*
 *  TokenResponse
 *  @author: minhhieuano
 *  @created 7/9/2025 10:47 PM
 * */

package com.smartelearning.smartelearning.dto.response;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenResponse {
	private String id;
	private String content;
	private Instant expiredTime;
}
