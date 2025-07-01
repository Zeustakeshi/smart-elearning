package router

import (
	"errors"
	"github.com/gin-gonic/gin"
	dto "smart-elearning/internal/dto/request"
	"smart-elearning/internal/service"
	"smart-elearning/pkg/response"
	"smart-elearning/pkg/utils"
	"strconv"
)

type CourseRoute struct {
	courseService service.CourseService
}

func NewCourseRoute(courseService service.CourseService) *CourseRoute {
	return &CourseRoute{
		courseService: courseService,
	}
}

func (route *CourseRoute) CreateCourse(c *gin.Context) {

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	var request dto.CreateCourseRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		_ = c.Error(err)
		return
	}

	course, err := route.courseService.CreateCourse(&request, user)
	if err != nil {
		_ = c.Error(err)
		return
	}

	response.ResponseSuccess(c, response.SUCCESS, course)

}

func (route *CourseRoute) GetAllCourse(c *gin.Context) {
	page, err := strconv.Atoi(c.Query("page"))

	if err != nil {
		_ = c.Error(errors.New("Invalid Request query"))
		return
	}

	limit, err := strconv.Atoi(c.Query("limit"))

	if err != nil {
		_ = c.Error(errors.New("Invalid Request query"))
		return
	}

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	courses, err := route.courseService.GetAllCourse(page, limit, user)
	if err != nil {
		_ = c.Error(err)
		return
	}

	response.ResponseSuccess(c, response.SUCCESS, courses)
}
