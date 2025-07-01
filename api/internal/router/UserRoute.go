package router

import (
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/service"
	"smart-elearning/pkg/response"
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

	username, err := userRoute.userService.GetUsername()

	if err != nil {
		_ = ctx.Error(err)
		return
	}

	response.ResponseSuccess(ctx, response.SUCCESS, gin.H{
		"username": username,
	})
}

func (userRoute *UserRoute) GetUser(c *gin.Context) {
	user, err := userRoute.userService.GetUser()

	if err != nil {
		_ = c.Error(err)
		return
	}

	response.ResponseSuccess(c, response.SUCCESS, user)
}
