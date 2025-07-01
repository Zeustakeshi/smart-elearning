package mapper

import (
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
)

func ToTeacherPublicResponse(teacher *entity.User) (*response.TeacherPublicInfoResponse, error) {
	teacherInfo := &response.TeacherPublicInfoResponse{
		Email:  teacher.Email,
		Name:   teacher.Username,
		Avatar: teacher.Avatar,
	}
	return teacherInfo, nil
}
