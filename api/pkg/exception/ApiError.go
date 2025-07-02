package exception

import (
	"errors"
	"smart-elearning/pkg/response"
)

type ApiError struct {
	ResponseCode int   `json:"-"`
	Err          error `json:"-"`
}

func NewApiError(responseCode int, err error) *ApiError {
	return &ApiError{
		ResponseCode: responseCode,
		Err:          err,
	}
}

func NewDefaultApiError(responseCode int, err error) *ApiError {
	var wrappedErr error
	if err != nil {
		wrappedErr = fmt.Errorf("%s: %w", response.ResponseMessage[responseCode].Message, err)
	} else {
		wrappedErr = errors.New(response.ResponseMessage[responseCode].Message)
	}
	return &ApiError{
		ResponseCode: responseCode,
		Err:          wrappedErr,
	}
}

func (e *ApiError) Error() string {
	return response.ResponseMessage[e.ResponseCode].Message
}

func (e *ApiError) Unwrap() error {
	return e.Err
}
