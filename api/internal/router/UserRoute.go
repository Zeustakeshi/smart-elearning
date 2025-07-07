package router

import (
	"github.com/gin-gonic/gin"
	dto "smart-elearning/internal/dto/request"
	"smart-elearning/internal/service"
	responseStatus "smart-elearning/pkg/response"
	"smart-elearning/pkg/utils"
)

type UserRoute struct {
	userService service.UserService
}

func NewUserRoute(userService service.UserService) *UserRoute {
	return &UserRoute{userService: userService}
}

func (route *UserRoute) GetUserInfo(c *gin.Context) {
	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	userInfo, err := route.userService.GetUserInfo(user)

	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, userInfo)

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

func (userRoute *UserRoute) Login(c *gin.Context) {
	var request dto.LoginRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		_ = c.Error(err)
		return
	}

	token, err := userRoute.userService.Login(&request)
	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, token)

}
