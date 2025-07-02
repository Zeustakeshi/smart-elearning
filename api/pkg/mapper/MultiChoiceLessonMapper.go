package mapper

import (
	"smart-elearning/internal/common/constants"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
)

func RequestToMultiChoiceLesson(courseId uint, request *request.CreateMultiChoiceLessonRequest) (*entity.MultiChoiceLesson, error) {
	return &entity.MultiChoiceLesson{
		Lesson: entity.Lesson{
			Name:     request.Name,
			CourseId: courseId,
			Type:     constants.LESSON_MULTI_CHOICE_QUESTION,
		},
		DurationMinutes:             request.DurationMinutes,
		AllowViewAnswersAfterSubmit: request.AllowViewAnswersAfterSubmit,
		AllowViewScoreAfterSubmit:   request.AllowViewScoreAfterSubmit,
		AntiCheatingEnable:          request.AntiCheatingEnable,
		StartTime:                   request.StartTime,
	}, nil
}

func ToMultiChoiceLessonInfoResponse(lesson *entity.MultiChoiceLesson, totalQuestion int) (*response.MultiChoiceLessonInfoResponse, error) {
	return &response.MultiChoiceLessonInfoResponse{
		Id:              lesson.ID,
		Name:            lesson.Name,
		StartTime:       lesson.StartTime,
		DurationMinutes: lesson.DurationMinutes,
		TotalQuestion:   totalQuestion,
		CreatedAt:       &lesson.CreatedAt,
		UpdatedAt:       &lesson.UpdatedAt,
	}, nil
}
