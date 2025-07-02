package response

import "net/http"

type ResponseStatus struct {
	StatusCode int
	Message    string
}

const (
	UNCATEGORIZED             = 9999
	SUCCESS                   = 1000
	USER_NOT_FOUND            = 1001
	UNAUTHORIZED              = 1002
	ACCESS_DENIED             = 1003
	TOKEN_INVALID_OR_EXPIRED  = 1004
	BAD_REQUEST               = 1005
	EMAIL_ALREADY_EXISTED     = 1006
	GENERATE_TOKEN_FAILED     = 1007
	INVALID_USER_TYPE         = 1008
	INVALID_EMAIL_OR_PASSWORD = 1009
	INVALID_COURSE_VISIBILITY = 1010
	COURSE_NOT_FOUND          = 1011
	JOIN_COURSE_ERROR         = 1012
	GET_COURSE_MEMBERS_ERROR  = 1013
	CREATE_LESSON_ERROR       = 1014
	JSON_PROCESSING_ERROR     = 1015
)

var ResponseMessage = map[int]ResponseStatus{
	SUCCESS:                   {StatusCode: http.StatusOK, Message: "Success"},
	UNCATEGORIZED:             {StatusCode: http.StatusInternalServerError, Message: "Uncategorized error"},
	USER_NOT_FOUND:            {StatusCode: http.StatusNotFound, Message: "User not found"},
	UNAUTHORIZED:              {StatusCode: http.StatusUnauthorized, Message: "Authorization header is required"},
	ACCESS_DENIED:             {StatusCode: http.StatusForbidden, Message: "Access denied"},
	TOKEN_INVALID_OR_EXPIRED:  {StatusCode: http.StatusForbidden, Message: "Invalid or expired token"},
	BAD_REQUEST:               {StatusCode: http.StatusBadRequest, Message: "Bad request."},
	EMAIL_ALREADY_EXISTED:     {StatusCode: http.StatusConflict, Message: "Email already exists."},
	GENERATE_TOKEN_FAILED:     {StatusCode: http.StatusInternalServerError, Message: "Server error: unable to generate authentication token."},
	INVALID_USER_TYPE:         {StatusCode: http.StatusBadRequest, Message: "Invalid user type error: user type must be STUDENT or TEACHER"},
	INVALID_EMAIL_OR_PASSWORD: {StatusCode: http.StatusUnauthorized, Message: "Invalid Email or Password."},
	INVALID_COURSE_VISIBILITY: {StatusCode: http.StatusBadRequest, Message: "Invalid course visibility."},
	COURSE_NOT_FOUND:          {StatusCode: http.StatusNotFound, Message: "Course not found."},
	JOIN_COURSE_ERROR:         {StatusCode: http.StatusInternalServerError, Message: "Join to course failed."},
	GET_COURSE_MEMBERS_ERROR:  {StatusCode: http.StatusInternalServerError, Message: "Cannot get course members. Internal server error"},
	CREATE_LESSON_ERROR:       {StatusCode: http.StatusInternalServerError, Message: "Cannot create lesson. Internal server error"},
	JSON_PROCESSING_ERROR:     {StatusCode: http.StatusInternalServerError, Message: "Json processing error"},
}
