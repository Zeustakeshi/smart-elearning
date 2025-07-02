package entity

import (
	"time"
)

type MultiChoiceLesson struct {
	Lesson
	DurationMinutes             int
	AllowViewAnswersAfterSubmit bool
	AllowViewScoreAfterSubmit   bool
	AntiCheatingEnable          bool
	StartTime                   *time.Time
}
