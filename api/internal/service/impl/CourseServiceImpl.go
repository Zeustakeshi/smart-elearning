package impl

import (
	"errors"
	gonanoid "github.com/matoous/go-nanoid"
	"smart-elearning/internal/common/constants"
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
	"smart-elearning/internal/repository"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/mapper"
	responseStatus "smart-elearning/pkg/response"
)

type CourseServiceImpl struct {
	repository *repository.CourseRepository
}

func NewCourseService(courseRepository *repository.CourseRepository) *CourseServiceImpl {
	return &CourseServiceImpl{
		repository: courseRepository,
	}
}

func (courseService *CourseServiceImpl) CreateCourse(request *request.CreateCourseRequest, teacher *common.ClaimUser) (*response.CourseResponse, error) {
	if request.Visibility != constants.COURSE_PUBLIC &&
		request.Visibility != constants.COURSE_LINK_ONLY &&
		request.Visibility != constants.COURSE_PRIVATE {
		return nil, exception.NewApiError(responseStatus.INVALID_COURSE_VISIBILITY, errors.New("invalid course visibility"))
	}

	courseCode, err := gonanoid.Nanoid()

	if err != nil {
		return nil, err
	}

	newCourse, err := courseService.repository.Save(&entity.Course{
		Code:        courseCode,
		Name:        request.Name,
		Description: request.Description,
		Avatar:      "",
		Background:  "",
		TeacherId:   teacher.ID,
		Visibility:  request.Visibility,
	})

	if err != nil {
		return nil, err
	}

	return mapper.ToCourseResponse(newCourse)

}

func (courseService *CourseServiceImpl) GetAllCourse(page int, limit int, user *common.ClaimUser) ([]*response.CourseOverviewResponse, error) {
	courses, err := courseService.repository.FindAllByTeacherId(user.ID, page, limit)

	if err != nil {
		return nil, err
	}

	var courseResponses []*response.CourseOverviewResponse

	for _, course := range courses {
		courseResponse, err := mapper.ToCourseOverviewResponse(course)

		if err != nil {
			return nil, err
		}
		courseResponses = append(courseResponses, courseResponse)
	}
	return courseResponses, nil
}

func (courseService *CourseServiceImpl) IsCourseOwner(courseId uint, teacherId uint) (bool, error) {
	_, err := courseService.repository.FindByIdAndTeacherId(courseId, teacherId)
	if err != nil {
		return false, err
	}
	return true, nil
}
