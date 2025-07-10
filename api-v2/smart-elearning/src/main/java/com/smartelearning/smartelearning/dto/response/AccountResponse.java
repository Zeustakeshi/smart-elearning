/*
 *  AccoutResponse
 *  @author: minhhieuano
 *  @created 7/9/2025 11:25 PM
 * */

package com.smartelearning.smartelearning.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountResponse {
	private String fullName;
	private String email;
	private String phone;
	private String avatar;
}
