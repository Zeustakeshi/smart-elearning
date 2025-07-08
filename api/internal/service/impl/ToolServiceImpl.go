package impl

import (
	"context"
	"fmt"
	"io"
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/grpc/client"
	generated_stubs "smart-elearning/proto"
	"time"
)

type ToolServiceImpl struct {
}

func NewToolService() *ToolServiceImpl {
	return &ToolServiceImpl{}
}

func (service *ToolServiceImpl) GenerateLessonPlan(
	request *request.GenerateLessonPlanRequest,
	teacher *common.ClaimUser,

) chan string {
	ch := make(chan string)

	go func() {

		defer close(ch)

		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
		defer cancel()

		var courseId uint64

		if request.CourseId != nil {
			courseId = uint64(*request.CourseId)
		}

		stream, err := client.L2_Client.GenerateLessonPlan(ctx, &generated_stubs.LessonPlanRequest{
			Title:       request.Title,
			Description: request.Description,
			FileUrl:     "file_url",
			TeacherNote: request.TeacherNote,
			Format:      request.Format,
			TeacherId:   uint64(teacher.ID),
			CourseId:    &courseId,
		})

		if err != nil {
			ch <- fmt.Sprintf("<ERROR>%v</ERROR>", err)
			return
		}

		for {
			select {
			case <-ctx.Done():
				ch <- fmt.Sprintf("<TIMEOUT>%v</TIMEOUT>", ctx.Err())
				return
			default:
				resp, err := stream.Recv()
				if err == io.EOF {
					ch <- fmt.Sprintf("<END>%v</END>", err)
					return
				}
				if err != nil {
					ch <- fmt.Sprintf("<ERROR>%v</ERROR>", err)
					return
				}
				ch <- fmt.Sprintf("<MESSAGE>%v</MESSAGE>", resp.Content)
			}
		}

	}()

	return ch
}
