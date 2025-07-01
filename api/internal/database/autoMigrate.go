package database

import "smart-elearning/internal/entity"

func AutoMigrate() {
	err := DB.AutoMigrate(&entity.User{})
	if err != nil {
		return
	}
}
