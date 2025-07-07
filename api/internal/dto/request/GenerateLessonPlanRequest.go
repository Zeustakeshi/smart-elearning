package request

type GenerateLessonPlanRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	TeacherNote string `json:"teacher_note"`
	Format      string `json:"format"`
	CourseId    *int64 `json:"course_id"`
}
