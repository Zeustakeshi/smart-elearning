package service

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/response"
)

type CourseMemberService interface {
	JoinCourse(courseCode string, student *common.ClaimUser) (bool, error)
	GetAllMember(courseId uint, page int, limit int, teacher *common.ClaimUser) ([]*response.CourseMemberResponse, error)
}
