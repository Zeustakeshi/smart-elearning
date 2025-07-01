package common

import "github.com/golang-jwt/jwt/v5"

type JwtClaims struct {
	Sub uint `json:"sub"`
	ClaimUser
	jwt.RegisteredClaims
}

type ClaimUser struct {
	ID       uint   `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Scope    string `json:"scope"`
}
