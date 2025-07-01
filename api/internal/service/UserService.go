package service

import "smart-elearning/internal/entity"

type UserService interface {
	GetUsername() (*string, error)
	GetUser() (*entity.User, error)
}
