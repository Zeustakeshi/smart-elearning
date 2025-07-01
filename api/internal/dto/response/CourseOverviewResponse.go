package response

type CourseOverviewResponse struct {
	Id              uint   `json:"id"`
	Code            string `json:"code"`
	Name            string `json:"name"`
	Avatar          string `json:"avatar"`
	Background      string `json:"background"`
	Visibility      string `json:"visibility"`
	NumberOfStudent int    `json:"number_of_student"`
	NumberOfLesson  int    `json:"number_of_lesson"`
}
