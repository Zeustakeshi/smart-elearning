package middleware

import (
	"errors"
	"github.com/gin-gonic/gin"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/log"
	"smart-elearning/pkg/response"
)

func ExceptionMiddleware(c *gin.Context) {
	c.Next()

	if len(c.Errors) <= 0 {
		return
	}

	lastError := c.Errors.Last()
	err := lastError.Err

	var apiError *exception.ApiError

	if errors.As(err, &apiError) {
		log.Logger.Error("Api Error: " + err.Error())
		response.ResponseError(c, apiError.ResponseCode)
		return
	}

	log.Logger.Error("Unhandled Error: " + err.Error())
	response.ResponseError(c, response.UNCATEGORIZED)

}
