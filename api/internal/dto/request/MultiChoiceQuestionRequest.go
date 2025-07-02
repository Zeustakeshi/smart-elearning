package request

type MultiChoiceQuestionRequest struct {
	LessonId  uint `json:"lesson_id"`
	Questions []struct {
		Question       string   `json:"question"`
		Answers        []string `json:"answers"`
		CorrectAnswers []int    `json:"correct_answers"`
	}
}
