package service

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
)

type CourseService interface {
	CreateCourse(request *request.CreateCourseRequest, user *common.ClaimUser) (*response.CourseResponse, error)

	GetAllCourse(page int, limit int, user *common.ClaimUser) ([]*response.CourseOverviewResponse, error)

	IsCourseOwner(courseId uint, teacherId uint) (bool, error)
}
