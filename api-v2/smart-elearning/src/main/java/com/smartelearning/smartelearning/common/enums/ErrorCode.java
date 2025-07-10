/*
 *  ErrorCode
 *  @author: minhhieuano
 *  @created 7/9/2025 10:25 PM
 * */

package com.smartelearning.smartelearning.common.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
	UNCATEGORIZED(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
	ACCESS_DENIED(1001, "Access denied", HttpStatus.FORBIDDEN),
	UNAUTHORIZED(1002, "Unauthorized", HttpStatus.UNAUTHORIZED),
	RESOURCE_NOT_FOUND(1003, "Resource not found", HttpStatus.NOT_FOUND),
	REQUEST_VALIDATION_FAILED(1004, "Request validation failed", HttpStatus.BAD_REQUEST),
	INVALID_TOKEN_TYPE(1005, "Invalid token type", HttpStatus.FORBIDDEN),
	ACCOUNT_NOT_FOUND(1006, "User not found", HttpStatus.NOT_FOUND),
	EMAIL_OR_PHONE_OR_USERNAME_ALREADY_EXISTED(
			1007, "Email or Phone or Username already existed.", HttpStatus.BAD_REQUEST),
	INVALID_USERNAME_OR_PASSWORD(1008, "Invalid Username or Password", HttpStatus.BAD_REQUEST),
	;
	private final String message;
	private final HttpStatus status;
	private final int code;

	ErrorCode(int code, String message, HttpStatus status) {
		this.code = code;
		this.message = message;
		this.status = status;
	}
}
