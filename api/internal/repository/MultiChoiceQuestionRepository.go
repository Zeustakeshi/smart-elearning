package repository

import (
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
)

type MultiChoiceQuestionRepository struct {
}

func NewMultiChoiceQuestionRepository() *MultiChoiceQuestionRepository {
	return &MultiChoiceQuestionRepository{}
}

func (*MultiChoiceQuestionRepository) SaveAll(questions []*entity.MultiChoiceQuestion) ([]*entity.MultiChoiceQuestion, error) {
	if len(questions) == 0 {
		return make([]*entity.MultiChoiceQuestion, 0), nil
	}

	err := database.DB.Create(&questions).Error

	if err != nil {
		return nil, err
	}

	return questions, nil
}
