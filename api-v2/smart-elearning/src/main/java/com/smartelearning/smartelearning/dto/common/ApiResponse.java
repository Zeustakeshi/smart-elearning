/*
 *  ApiResponse
 *  @author: minhhieuano
 *  @created 7/9/2025 10:24 PM
 * */

package com.smartelearning.smartelearning.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.smartelearning.smartelearning.common.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
	private Integer code;
	private T data;
	private Object errors;

	@JsonProperty("isSuccess")
	private Boolean isSuccess;

	public static <T> ApiResponse<T> success(T data) {
		return ApiResponse.<T>builder().code(1000).data(data).isSuccess(true).build();
	}

	public static <T> ApiResponse<T> error(Object errors, ErrorCode errorCode) {
		return ApiResponse.<T>builder()
				.code(errorCode.getCode())
				.errors(errors)
				.isSuccess(false)
				.build();
	}
}
