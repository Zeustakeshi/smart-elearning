package repository

import (
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
)

type MultiChoiceLessonRepository struct {
}

func NewMultiChoiceLessonRepository() *MultiChoiceLessonRepository {
	return &MultiChoiceLessonRepository{}
}

func (*MultiChoiceLessonRepository) Save(lesson *entity.MultiChoiceLesson) (*entity.MultiChoiceLesson, error) {
	err := database.DB.Create(lesson).Error
	if err != nil {
		return nil, err
	}
	return lesson, nil
}
