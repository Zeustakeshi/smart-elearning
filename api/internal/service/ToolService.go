package service

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
)

type ToolService interface {
	GenerateLessonPlan(
		request *request.GenerateLessonPlanRequest,
		teacher *common.ClaimUser,
	) chan string
}
