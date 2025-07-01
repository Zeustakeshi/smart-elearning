package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
	Avatar   string `json:"avatar"`
	Role     string `json:"role"`
}

func NewUser(email string, username string, password string, avatar string, role string) *User {
	return &User{
		Model:    gorm.Model{},
		Email:    email,
		Username: username,
		Password: password,
		Avatar:   avatar,
		Role:     role,
	}
}
