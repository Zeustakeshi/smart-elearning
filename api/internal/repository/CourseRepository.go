package repository

import (
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
)

type CourseRepository struct {
}

func NewCourseRepository() *CourseRepository {
	return &CourseRepository{}
}

func (*CourseRepository) Save(course *entity.Course) *entity.Course {
	database.DB.Create(course)
	return course
}
