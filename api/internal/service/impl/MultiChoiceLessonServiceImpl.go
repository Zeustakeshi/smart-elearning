package impl

import (
	"encoding/json"
	"errors"
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
	"smart-elearning/internal/repository"
	"smart-elearning/internal/service"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/mapper"
	responseStatus "smart-elearning/pkg/response"
)

type MultiChoiceLessonServiceImpl struct {
	courseService                 service.CourseService
	multiChoiceLessonRepository   *repository.MultiChoiceLessonRepository
	multiChoiceQuestionRepository *repository.MultiChoiceQuestionRepository
}

func NewMultiChoiceLessonService(
	courseService service.CourseService,
	multiChoiceLessonRepository *repository.MultiChoiceLessonRepository,
	multiChoiceQuestionRepository *repository.MultiChoiceQuestionRepository,
) *MultiChoiceLessonServiceImpl {
	return &MultiChoiceLessonServiceImpl{
		courseService:                 courseService,
		multiChoiceLessonRepository:   multiChoiceLessonRepository,
		multiChoiceQuestionRepository: multiChoiceQuestionRepository,
	}
}

func (lessonService *MultiChoiceLessonServiceImpl) CreateLesson(
	courseId uint,
	request *request.CreateMultiChoiceLessonRequest,
	teacher *common.ClaimUser,
) (*response.MultiChoiceLessonInfoResponse, error) {

	isOwner, err := lessonService.courseService.IsCourseOwner(courseId, teacher.ID)
	if err != nil {
		return nil, err
	}

	if !isOwner {
		return nil, exception.NewApiError(responseStatus.ACCESS_DENIED, nil)
	}

	multiChoiceLesson, err := mapper.RequestToMultiChoiceLesson(courseId, request)

	if err != nil {
		return nil, exception.NewApiError(responseStatus.CREATE_LESSON_ERROR, nil)
	}

	newMultiChoiceLesson, err := lessonService.multiChoiceLessonRepository.Save(multiChoiceLesson)

	if err != nil {
		return nil, exception.NewApiError(responseStatus.CREATE_LESSON_ERROR, nil)
	}

	lessonInfoResponse, err := mapper.ToMultiChoiceLessonInfoResponse(newMultiChoiceLesson, 0)
	if err != nil {
		return nil, exception.NewApiError(responseStatus.CREATE_LESSON_ERROR, nil)
	}

	return lessonInfoResponse, nil
}

func (lessonService *MultiChoiceLessonServiceImpl) UpdateQuestions(
	courseId uint,
	teacher *common.ClaimUser,
	request *request.MultiChoiceQuestionRequest,
) ([]*response.MultiChoiceQuestionResponse, error) {
	isOwner, err := lessonService.courseService.IsCourseOwner(courseId, teacher.ID)
	if err != nil {
		return nil, err
	}

	if !isOwner {
		return nil, exception.NewApiError(responseStatus.ACCESS_DENIED, nil)
	}

	var questions []*entity.MultiChoiceQuestion

	for _, requestQuestion := range request.Questions {

		answersJSON, err := json.Marshal(requestQuestion.Answers)
		if err != nil {
			return nil, exception.NewApiError(responseStatus.JSON_PROCESSING_ERROR, errors.New("Failed to marshal answers: "+err.Error()))
		}

		correctAnswersJSON, err := json.Marshal(requestQuestion.CorrectAnswers)
		if err != nil {
			return nil, exception.NewApiError(responseStatus.JSON_PROCESSING_ERROR, errors.New("Failed to marshal correct answers: "+err.Error()))
		}

		newQuestion := entity.MultiChoiceQuestion{
			LessonId:       request.LessonId,
			Question:       requestQuestion.Question,
			Answers:        answersJSON,
			CorrectAnswers: correctAnswersJSON,
		}
		questions = append(questions, &newQuestion)
	}

	newQuestions, err := lessonService.multiChoiceQuestionRepository.SaveAll(questions)
	if err != nil {
		return nil, err
	}

	var questionResponses []*response.MultiChoiceQuestionResponse

	for _, question := range newQuestions {

		var answers []string
		var correctAnswers []int

		if err := json.Unmarshal(question.Answers, &answers); err != nil {
			return nil, err
		}
		if err := json.Unmarshal(question.CorrectAnswers, &correctAnswers); err != nil {
			return nil, err
		}

		questionResponse := response.MultiChoiceQuestionResponse{
			Question:       question.Question,
			Answers:        answers,
			CorrectAnswers: correctAnswers,
		}
		questionResponses = append(questionResponses, &questionResponse)
	}
	return questionResponses, nil

}
