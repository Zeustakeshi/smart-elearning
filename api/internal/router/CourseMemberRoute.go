package router

import (
	"errors"
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/service"
	responseStatus "smart-elearning/pkg/response"
	"smart-elearning/pkg/utils"
	"strconv"
)

type CourseMemberRoute struct {
	courseMemberService service.CourseMemberService
}

func NewCourseMemberRoute(courseMemberService service.CourseMemberService) *CourseMemberRoute {
	return &CourseMemberRoute{
		courseMemberService: courseMemberService,
	}
}

func (route *CourseMemberRoute) JoinCourse(c *gin.Context) {
	courseCode := c.Query("code")

	if courseCode == "" {
		_ = c.Error(errors.New("Invalid Course Code."))
		return
	}

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	result, err := route.courseMemberService.JoinCourse(courseCode, user)

	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, result)
}

func (route *CourseMemberRoute) GetAllCourseMember(c *gin.Context) {

	courseId, err := strconv.Atoi(c.Param("courseId"))

	if err != nil {
		_ = c.Error(errors.New("Invalid Request query"))
		return
	}

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

	courseMembers, err := route.courseMemberService.GetAllMember(uint(courseId), page, limit, user)

	if err != nil {
		_ = c.Error(err)
		return
	}
	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, courseMembers)
}
