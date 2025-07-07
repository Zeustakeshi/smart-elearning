package impl

import (
	"smart-elearning/internal/config"
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/entity"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JwtServiceImpl struct {
}

func NewJwtService() *JwtServiceImpl {
	return &JwtServiceImpl{}
}

func (*JwtServiceImpl) GenerateJwt(account *entity.User) (string, error) {
	jwtSecret := []byte(config.Configs.Jwt.SecretKey)
	jwtExpireIn := config.Configs.Jwt.ExpireTime 

	if jwtExpireIn == 0 {
		jwtExpireIn = 2
	}

	claims := common.JwtClaims{
		Sub: account.ID,
		ClaimUser: common.ClaimUser{
			ID:       account.ID,
			Username: account.Username,
			Email:    account.Email,
			Scope:    account.Role,
		},
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(
				time.Now().Add(time.Duration(jwtExpireIn) * time.Hour)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtSecret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
