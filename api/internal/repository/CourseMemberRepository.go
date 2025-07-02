package repository

import (
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
)

type CourseMemberRepository struct {
}

func NewCourseMemberRepository() *CourseMemberRepository {
	return &CourseMemberRepository{}
}

func (*CourseMemberRepository) Save(courseMember *entity.CourseMember) (*entity.CourseMember, error) {

	if err := database.DB.Create(courseMember).Error; err != nil {
		return nil, err
	}
	return courseMember, nil
}

func (*CourseMemberRepository) FindAllByCourseId(courseId uint, page int, limit int) ([]*entity.CourseMember, error) {

	var members []*entity.CourseMember

	if err := database.DB.Where("course_id = ?", courseId).Offset(page * limit).Limit(limit).Find(&members).Error; err != nil {
		return nil, err
	}
	return members, nil
}
