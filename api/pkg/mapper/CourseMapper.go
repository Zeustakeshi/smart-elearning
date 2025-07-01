package mapper

import (
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
)

func ToCourseResponse(course *entity.Course) (*response.CourseResponse, error) {
	courseResponse := response.CourseResponse{
		Code:        course.Code,
		Name:        course.Name,
		Description: course.Description,
		Avatar:      course.Avatar,
		Background:  course.Background,
		Visibility:  course.Visibility,
		Teacher:     response.TeacherPublicInfoResponse{},
	}

	teacherInfo, err := ToTeacherPublicResponse(&course.Teacher)

	if err != nil {
		return nil, err
	}

	courseResponse.Teacher = *teacherInfo

	return &courseResponse, err
}
