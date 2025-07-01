package response

type CourseResponse struct {
	Code        string
	Name        string
	Description string
	Avatar      string
	Background  string
	Visibility  string
	Teacher     TeacherPublicInfoResponse
}
