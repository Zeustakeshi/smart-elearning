package exception

import "smart-elearning/pkg/response"

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

func (e *ApiError) Error() string {
	return response.ResponseMessage[e.ResponseCode].Message
}

func (e *ApiError) Unwrap() error {
	return e.Err
}
