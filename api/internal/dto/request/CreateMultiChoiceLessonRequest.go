package request

import "time"

type CreateMultiChoiceLessonRequest struct {
	Name                        string     `json:"name"`
	DurationMinutes             int        `json:"duration_minutes"`
	AllowViewAnswersAfterSubmit bool       `json:"allow_view_answers_after_submit"`
	AllowViewScoreAfterSubmit   bool       `json:"allow_view_score_after_submit"`
	AntiCheatingEnable          bool       `json:"anti_cheating_enable"`
	StartTime                   *time.Time `json:"start_time"`
}
