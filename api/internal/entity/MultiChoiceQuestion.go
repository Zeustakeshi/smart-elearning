package entity

import (
	"encoding/json"
	"gorm.io/gorm"
)

type MultiChoiceQuestion struct {
	gorm.Model
	LessonId       uint
	Lesson         *MultiChoiceLesson
	Question       string
	Answers        json.RawMessage `gorm:"type:json"`
	CorrectAnswers json.RawMessage `gorm:"type:json"`
}
