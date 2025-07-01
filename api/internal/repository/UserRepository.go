package repository

import (
	"errors"
	"gorm.io/gorm"
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
)

type UserRepository struct {
}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (*UserRepository) ExistsByEmail(email string) (exists bool, err error) {
	var user entity.User
	result := database.DB.Select("id").Where("email = ?", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, result.Error
	}
	return true, nil
}

func (*UserRepository) Save(user *entity.User) *entity.User {
	database.DB.Create(user)
	return user
}
