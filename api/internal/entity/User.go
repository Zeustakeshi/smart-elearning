package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"password"`
	Avatar   string `json:"avatar"`
	Role     string `json:"role"`
}
