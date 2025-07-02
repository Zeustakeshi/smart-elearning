package response

type MultiChoiceQuestionResponse struct {
	Question       string   `json:"question"`
	Answers        []string `json:"answers"`
	CorrectAnswers []int    `json:"correct_answers"`
}
