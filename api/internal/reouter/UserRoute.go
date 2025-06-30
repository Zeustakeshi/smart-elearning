package reouter

import (
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/service"
)

type UserRoute struct {
	userService service.UserService
}

func NewUserRoute(userService service.UserService) *UserRoute {
	return &UserRoute{
		userService: userService,
	}
}

func (userRoute *UserRoute) GetUsername(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"username": userRoute.userService.GetUsername(),
	})
}
