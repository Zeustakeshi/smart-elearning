package middleware

import (
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/common/constants"
	"smart-elearning/pkg/response"
	"smart-elearning/pkg/utils"
)

func StudentMiddleware(c *gin.Context) {
	user, err := utils.GetClaimUser(c)

	if err != nil {
		response.ResponseError(c, response.ACCESS_DENIED)
		c.Abort()
		return
	}

	if user.Scope != constants.ROLE_STUDENT {
		response.ResponseError(c, response.ACCESS_DENIED)
		c.Abort()
		return
	}

	c.Next()
}
