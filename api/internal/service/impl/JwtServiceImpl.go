package impl

import (
	"github.com/golang-jwt/jwt/v5"
	"smart-elearning/internal/config"
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/entity"
	"time"
)

type JwtServiceImpl struct {
}

func NewJwtService() *JwtServiceImpl {
	return &JwtServiceImpl{}
}

func (*JwtServiceImpl) GenerateJwt(user *entity.User) (*string, error) {
	jwtSecret := []byte(config.Configs.Jwt.SecretKey)
	jwtExpireIn := config.Configs.Jwt.ExpireTime

	claims := common.JwtClaims{
		Sub: user.ID,
		ClaimUser: common.ClaimUser{
			ID:       user.ID,
			Username: user.Username,
			Scope:    user.Role,
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
		return nil, err
	}

	return &tokenString, nil
}
