package response

import "time"

type CourseMemberResponse struct {
	Id         uint      `json:"id"`
	Name       string    `json:"name"`
	Avatar     string    `json:"avatar"`
	EnrolledOn time.Time `json:"enrolled_on"`
}
