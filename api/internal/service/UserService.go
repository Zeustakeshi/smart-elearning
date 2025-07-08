package service

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
)

type UserService interface {
	CreateUser(request *request.CreateUserRequest) (*response.TokenResponse, error)
	Login(request *request.LoginRequest) (*response.TokenResponse, error)
	GetUserInfo(user *common.ClaimUser) (*response.UserInfoResponse, error)
}
