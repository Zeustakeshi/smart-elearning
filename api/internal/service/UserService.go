package service

import (
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
)

type UserService interface {
	CreateUser(request *request.CreateUserRequest) (*response.TokenResponse, error)
}
