package router

import (
	"errors"
	"github.com/gin-gonic/gin"
	dto "smart-elearning/internal/dto/request"
	"smart-elearning/internal/service"
	responseStatus "smart-elearning/pkg/response"
	"smart-elearning/pkg/utils"
	"strconv"
)

type MultiChoiceLessonRoute struct {
	lessonService service.MultiChoiceLessonService
}

func NewMultiChoiceLessonRoute(lessonService service.MultiChoiceLessonService) *MultiChoiceLessonRoute {
	return &MultiChoiceLessonRoute{
		lessonService: lessonService,
	}
}

func (route *MultiChoiceLessonRoute) CreateLesson(c *gin.Context) {
	var request dto.CreateMultiChoiceLessonRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		_ = c.Error(err)
		return
	}

	courseId, err := strconv.Atoi(c.Param("courseId"))

	if err != nil {
		_ = c.Error(errors.New("Invalid Request query"))
		return
	}

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	lessonResponse, err := route.lessonService.CreateLesson(uint(courseId), &request, user)

	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, lessonResponse)
}

func (route *MultiChoiceLessonRoute) UpdateQuestion(c *gin.Context) {
	var request dto.MultiChoiceQuestionRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		_ = c.Error(err)
		return
	}

	courseId, err := strconv.Atoi(c.Param("courseId"))

	if err != nil {
		_ = c.Error(errors.New("Invalid Request query"))
		return
	}

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	questions, err := route.lessonService.UpdateQuestions(uint(courseId), user, &request)
	if err != nil {
		_ = c.Error(err)
		return
	}

	responseStatus.ResponseSuccess(c, responseStatus.SUCCESS, questions)
}
