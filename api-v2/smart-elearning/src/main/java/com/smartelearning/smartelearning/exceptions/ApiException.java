/*
 *  ApiException
 *  @author: minhhieuano
 *  @created 7/9/2025 10:27 PM
 * */

package com.smartelearning.smartelearning.exceptions;

import com.smartelearning.smartelearning.common.enums.ErrorCode;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ApiException extends RuntimeException {
	private ErrorCode errorCode;

	public ApiException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
}
