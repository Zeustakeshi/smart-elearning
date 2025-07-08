package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	dto "smart-elearning/internal/dto/request"
	"smart-elearning/internal/service"
	"smart-elearning/pkg/utils"
)

type ToolRoute struct {
	toolService service.ToolService
}

func NewToolRote(
	toolService service.ToolService,
) *ToolRoute {
	return &ToolRoute{
		toolService: toolService,
	}
}

func (route *ToolRoute) GenerateLessonPlan(c *gin.Context) {

	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")

	user, err := utils.GetClaimUser(c)

	if err != nil {
		_ = c.Error(err)
		return
	}

	request := new(dto.GenerateLessonPlanRequest)

	if err := c.ShouldBindJSON(request); err != nil {
		_ = c.Error(err)
		return
	}

	stream := route.toolService.GenerateLessonPlan(request, user)

	for {
		select {
		case data, ok := <-stream:
			if !ok {
				return
			}

			_, err := fmt.Fprintf(c.Writer, "data: %s", data)
			if err != nil {
				return
			}

			if flusher, ok := c.Writer.(http.Flusher); ok {
				flusher.Flush()
			}

			c.SSEvent("message", data)
		case <-c.Request.Context().Done():
			return
		}
	}
}
