package service

import "smart-elearning/internal/entity"

type JwtService interface {
	GenerateJwt(account *entity.User) (string, error)
}
