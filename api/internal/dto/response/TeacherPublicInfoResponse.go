package response

type TeacherPublicInfoResponse struct {
	Id     uint   `json:"id"`
	Email  string `json:"email"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
}
