package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"smart-elearning/internal/config"
	"smart-elearning/internal/dto/common"
	"smart-elearning/pkg/response"
	"strings"
)

func SecurityMiddleWare(c *gin.Context) {

	jwtSecret := []byte(config.Configs.Jwt.SecretKey)

	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		response.ResponseError(c, response.UNAUTHORIZED)
		c.Abort()
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	if tokenString == authHeader {
		response.ResponseError(c, response.UNAUTHORIZED)
		c.Abort()
		return
	}

	claims := &common.JwtClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		panic(err)
		response.ResponseError(c, response.TOKEN_INVALID_OR_EXPIRED)
		c.Abort()
		return
	}

	c.Set("auth_user", claims.ClaimUser)
	c.Next()
}
