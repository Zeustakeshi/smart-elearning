package utils

import (
	"errors"
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/dto/common"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/response"
)

func GetClaimUser(c *gin.Context) (*common.ClaimUser, error) {
	authUser, exist := c.Get("auth_user")

	if !exist {
		return nil, &exception.ApiError{
			ResponseCode: response.ACCESS_DENIED,
			Err:          errors.New(response.ResponseMessage[response.ACCESS_DENIED].Message),
		}
	}

	claimUser, ok := authUser.(common.ClaimUser)
	if !ok {
		return nil, &exception.ApiError{
			ResponseCode: response.ACCESS_DENIED,
			Err:          errors.New(response.ResponseMessage[response.ACCESS_DENIED].Message),
		}
	}

	return &claimUser, nil
}
