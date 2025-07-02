package database

import (
	"smart-elearning/internal/entity"
	"smart-elearning/pkg/log"
)

func AutoMigrate() {
	err := DB.AutoMigrate(
		&entity.User{},
		&entity.Course{},
		&entity.CourseMember{},
		&entity.MultiChoiceLesson{},
		&entity.MultiChoiceQuestion{},
	)

	if err != nil {
		log.Logger.Error(err.Error())
		return
	}
}
