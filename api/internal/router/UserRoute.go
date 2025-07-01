package router

import (
	"github.com/gin-gonic/gin"
	dto "smart-elearning/internal/dto/request"
	"smart-elearning/internal/service"
	responseStatus "smart-elearning/pkg/response"
)

type UserRoute struct {
	userService service.UserService
}

func NewUserRoute(userService service.UserService) *UserRoute {
	return &UserRoute{userService: userService}
}

func (userRoute *UserRoute) CreateUser(c *gin.Context) {
	var request dto.CreateUserRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		_ = c.Error(err)
		return
	}

	token, err := userRoute.userService.CreateUser(&request)
	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, token)
}
