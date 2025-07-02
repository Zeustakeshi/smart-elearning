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

func NewDefaultApiError(responseCode int) *ApiError {
	return &ApiError{
		ResponseCode: responseCode,
		Err:          errors.New(response.ResponseMessage[responseCode].Message),
	}
}

func (e *ApiError) Error() string {
	return response.ResponseMessage[e.ResponseCode].Message
}

func (e *ApiError) Unwrap() error {
	return e.Err
}
