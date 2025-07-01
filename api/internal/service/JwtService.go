package service

import "smart-elearning/internal/entity"

type JwtService interface {
	GenerateJwt(user *entity.User) (*string, error)
}
