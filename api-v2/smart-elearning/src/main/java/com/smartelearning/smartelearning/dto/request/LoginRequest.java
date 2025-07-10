/*
 *  LoginRequest
 *  @author: minhhieuano
 *  @created 7/9/2025 11:14 PM
 * */

package com.smartelearning.smartelearning.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
	@NotBlank(message = "Username cannot be empty")
	@Size(min = 5, max = 20, message = "Username must be between 5 and 20 characters")
	@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
	private String username;

	@NotBlank(message = "Password cannot be empty")
	@Size(min = 8, max = 30, message = "Password must be between 8 and 30 characters")
	@Pattern(
			regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
			message =
					"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
	private String password;
}
