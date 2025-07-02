package impl

import (
	"smart-elearning/internal/dto/common"
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
	"smart-elearning/internal/repository"
	"smart-elearning/pkg/exception"
	responseCode "smart-elearning/pkg/response"
	"sync"
)

type CourseMemberServiceImpl struct {
	courseRepository       *repository.CourseRepository
	courseMemberRepository *repository.CourseMemberRepository
	userRepository         *repository.UserRepository
}

func NewCourseMemberService(
	courseRepository *repository.CourseRepository,
	courseMemberRepository *repository.CourseMemberRepository,
	userRepository *repository.UserRepository,
) *CourseMemberServiceImpl {
	return &CourseMemberServiceImpl{
		courseRepository:       courseRepository,
		courseMemberRepository: courseMemberRepository,
		userRepository:         userRepository,
	}
}

func (courseMemberService *CourseMemberServiceImpl) JoinCourse(courseCode string, student *common.ClaimUser) (bool, error) {
	course, err := courseMemberService.courseRepository.FindByCode(courseCode)

	if err != nil {
		return false, exception.NewApiError(responseCode.COURSE_NOT_FOUND, err)
	}

	_, err = courseMemberService.courseMemberRepository.Save(entity.NewCourseMember(course.ID, student.ID))

	if err != nil {
		return false, exception.NewApiError(responseCode.JOIN_COURSE_ERROR, err)
	}

	return true, nil
}

func (courseMemberService *CourseMemberServiceImpl) GetAllMember(courseId uint, page int, limit int, teacher *common.ClaimUser) ([]*response.CourseMemberResponse, error) {
	_, err := courseMemberService.courseRepository.FindByIdAndTeacherId(courseId, teacher.ID)

	if err != nil {
		return nil, exception.NewApiError(responseCode.COURSE_NOT_FOUND, err)
	}

	members, err := courseMemberService.courseMemberRepository.FindAllByCourseId(courseId, page, limit)

	if err != nil {
		return nil, exception.NewApiError(responseCode.GET_COURSE_MEMBERS_ERROR, err)
	}

	if len(members) == 0 {
		return []*response.CourseMemberResponse{}, nil
	}
	var wg sync.WaitGroup
	errChan := make(chan error, len(members))
	resultChan := make(chan *response.CourseMemberResponse, len(members))

	for _, member := range members {

		wg.Add(1)

		go func(m *entity.CourseMember) {
			defer wg.Done()

			memberInfo, err := courseMemberService.userRepository.FindById(m.StudentId)
			if err != nil {
				errChan <- exception.NewApiError(responseCode.GET_COURSE_MEMBERS_ERROR, err)
				return
			}

			resultChan <- &response.CourseMemberResponse{
				Id:         memberInfo.ID,
				Name:       memberInfo.Username,
				Avatar:     memberInfo.Avatar,
				EnrolledOn: *m.EnrolledOn,
			}

		}(member)

	}

	go func() {
		wg.Wait()
		close(errChan)
		close(resultChan)
	}()

	memberResponses := []*response.CourseMemberResponse{}

	for {
		select {
		case err := <-errChan:
			if err != nil {
				return nil, err
			}
		case result, ok := <-resultChan:
			if !ok {
				goto EndCollection
			}
			if result != nil {
				memberResponses = append(memberResponses, result)
			}
		}
	}
EndCollection:
	return memberResponses, nil

}
