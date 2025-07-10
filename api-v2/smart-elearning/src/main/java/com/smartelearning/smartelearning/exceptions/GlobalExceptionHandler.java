/*
 *  GlobalExceptionHandler
 *  @author: minhhieuano
 *  @created 7/9/2025 10:27 PM
 * */

package com.smartelearning.smartelearning.exceptions;

import com.smartelearning.smartelearning.common.enums.ErrorCode;
import com.smartelearning.smartelearning.dto.common.ApiResponse;
import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({InsufficientAuthenticationException.class, InvalidBearerTokenException.class})
	public ResponseEntity<ApiResponse<?>> handleUnAuthorizedException(AuthenticationException exception) {
		logError(exception);
		ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
		return new ResponseEntity<>(ApiResponse.error(exception.getMessage(), errorCode), errorCode.getStatus());
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ApiResponse<?>> handleAuthenticationException(AuthenticationException exception) {
		logError(exception);
		ErrorCode errorCode = ErrorCode.ACCESS_DENIED;
		return new ResponseEntity<>(ApiResponse.error(exception.getMessage(), errorCode), errorCode.getStatus());
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ApiResponse<?>> handleAccessDeniedException(AccessDeniedException exception) {
		logError(exception);
		ErrorCode errorCode = ErrorCode.ACCESS_DENIED;
		return new ResponseEntity<>(ApiResponse.error(exception.getMessage(), errorCode), errorCode.getStatus());
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ApiResponse<?>> handleApiException(ApiException exception) {
		logError(exception);
		ErrorCode errorCode = exception.getErrorCode();
		return new ResponseEntity<>(ApiResponse.error(exception.getMessage(), errorCode), errorCode.getStatus());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException ex) {
		Map<String, Object> errors = new HashMap<>();
		log.info("Validation failed {}", ex.getMessage());
		for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
			errors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		return new ResponseEntity<>(ApiResponse.error(errors, ErrorCode.REQUEST_VALIDATION_FAILED), ex.getStatusCode());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<?>> handleUnCategorizedException(Exception exception) {
		logError(exception);
		ErrorCode errorCode = ErrorCode.UNCATEGORIZED;
		return new ResponseEntity<>(ApiResponse.error(exception.getMessage(), errorCode), errorCode.getStatus());
	}

	private void logError(Exception exception) {
		log.error(exception.getClass().getName());
		log.error(exception.getMessage());
	}
}
