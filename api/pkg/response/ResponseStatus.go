package response

import "net/http"

type ResponseStatus struct {
	StatusCode int
	Message    string
}

const (
	UNCATEGORIZED            = 9999
	SUCCESS                  = 1000
	USER_NOT_FOUND           = 1001
	UNAUTHORIZED             = 1002
	ACCESS_DENIED            = 1003
	TOKEN_INVALID_OR_EXPIRED = 1004
	BAD_REQUEST              = 1005
)

var ResponseMessage = map[int]ResponseStatus{
	SUCCESS:                  {StatusCode: http.StatusOK, Message: "Success"},
	UNCATEGORIZED:            {StatusCode: http.StatusInternalServerError, Message: "Uncategorized error"},
	USER_NOT_FOUND:           {StatusCode: http.StatusNotFound, Message: "User not found"},
	UNAUTHORIZED:             {StatusCode: http.StatusUnauthorized, Message: "Authorization header is required"},
	ACCESS_DENIED:            {StatusCode: http.StatusForbidden, Message: "Access denied"},
	TOKEN_INVALID_OR_EXPIRED: {StatusCode: http.StatusForbidden, Message: "Invalid or expired token"},
	BAD_REQUEST:              {StatusCode: http.StatusBadRequest, Message: "Bad request."},
}
