package response

import (
	"github.com/gin-gonic/gin"
	"time"
)

type ApiResponse struct {
	Code      int         `json:"code"`
	Message   string      `json:"message"`
	Data      interface{} `json:"data"`
	Timestamp time.Time   `json:"timestamp"`
}

func ResponseSuccess(c *gin.Context, code int, data interface{}) {
	c.JSON(ResponseMessage[code].StatusCode, ApiResponse{
		Code:      code,
		Data:      data,
		Message:   ResponseMessage[code].Message,
		Timestamp: time.Now(),
	})
}

func ResponseError(c *gin.Context, code int) {
	c.JSON(ResponseMessage[code].StatusCode, ApiResponse{
		Code:      code,
		Data:      nil,
		Message:   ResponseMessage[code].Message,
		Timestamp: time.Now(),
	})
}
