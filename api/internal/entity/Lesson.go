package entity

import "gorm.io/gorm"

type Lesson struct {
	gorm.Model
	Name     string
	CourseId uint
	Course   *Course
	Type     string
}
