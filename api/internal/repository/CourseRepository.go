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

func (*CourseRepository) Save(course *entity.Course) (*entity.Course, error) {
	if err := database.DB.Create(course).Error; err != nil {
		return nil, err
	}
	return course, nil
}

func (*CourseRepository) FindAllByTeacherId(teacherId uint, page int, limit int) ([]*entity.Course, error) {

	var courses []*entity.Course

	if err := database.DB.Where("teacher_id = ?", teacherId).Offset(page * limit).Limit(limit).Find(&courses).Error; err != nil {
		return nil, err
	}
	return courses, nil
}

func (*CourseRepository) FindByCode(courseCode string) (*entity.Course, error) {

	var course entity.Course
	result := database.DB.Where("code = ?", courseCode).First(&course)

	if result.Error != nil {
		return nil, result.Error
	}
	return &course, nil
}

func (*CourseRepository) FindByIdAndTeacherId(courseId uint, teacherId uint) (*entity.Course, error) {

	var course entity.Course
	result := database.DB.Where("id = ? and teacher_id = ?", courseId, teacherId).First(&course)

	if result.Error != nil {
		return nil, result.Error
	}
	return &course, nil
}
