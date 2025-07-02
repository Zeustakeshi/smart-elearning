package service

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
)

type MultiChoiceLessonService interface {
	CreateLesson(
		courseId uint,
		request *request.CreateMultiChoiceLessonRequest,
		teacher *common.ClaimUser,
	) (*response.MultiChoiceLessonInfoResponse, error)

	UpdateQuestions(
		courseId uint,
		teacher *common.ClaimUser,
		request *request.MultiChoiceQuestionRequest,
	) ([]*response.MultiChoiceQuestionResponse, error)
}
