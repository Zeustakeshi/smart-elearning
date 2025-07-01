package response

type CourseResponse struct {
	Id          uint                      `json:"id"`
	Code        string                    `json:"code"`
	Name        string                    `json:"name"`
	Description string                    `json:"description"`
	Avatar      string                    `json:"avatar"`
	Background  string                    `json:"background"`
	Visibility  string                    `json:"visibility"`
	Teacher     TeacherPublicInfoResponse `json:"teacher"`
}
