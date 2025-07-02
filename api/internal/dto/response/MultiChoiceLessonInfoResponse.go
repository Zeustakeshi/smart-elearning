package response

import "time"

type MultiChoiceLessonInfoResponse struct {
	Id              uint       `json:"id"`
	Name            string     `json:"name"`
	StartTime       *time.Time `json:"start_time"`
	DurationMinutes int        `json:"duration_minutes"`
	TotalQuestion   int        `json:"total_question"`
	CreatedAt       *time.Time `json:"created_at"`
	UpdatedAt       *time.Time `json:"updated_at"`
}
