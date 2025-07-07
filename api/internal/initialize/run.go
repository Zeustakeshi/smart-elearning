package initialize

import (
	"smart-elearning/internal/config"
	"smart-elearning/internal/database"
	"smart-elearning/internal/grpc/client"
	"smart-elearning/internal/repository"
	"smart-elearning/internal/router"
	"smart-elearning/internal/service/impl"
	"smart-elearning/pkg/log"
)

func Run() {

	/*	LOGGER CONFIG */
	log.InitLogger()

	/* APPLICATION CONFIG */
	config.LoadConfig()

	/* DATABASE CONFIG */
	database.ConnectToDatabase()
	database.AutoMigrate()

	/* GRPC Configs */
	client.InitL2Client()

	/* DI CONFIG */

	/* REPOSITORY */
	userRepository := repository.NewUserRepository()
	courseRepository := repository.NewCourseRepository()
	courseMemberRepository := repository.NewCourseMemberRepository()
	multiChoiceLessonRepository := repository.NewMultiChoiceLessonRepository()
	multiChoiceQuestionRepository := repository.NewMultiChoiceQuestionRepository()

	/* SERVICE */
	jwtService := impl.NewJwtService()
	passwordService := impl.NewPasswordService()
	userService := impl.NewUserService(jwtService, userRepository, passwordService)
	courseService := impl.NewCourseService(courseRepository)
	courseMemberService := impl.NewCourseMemberService(courseRepository, courseMemberRepository, userRepository)
	multiChoiceLessonService := impl.NewMultiChoiceLessonService(
		courseService,
		multiChoiceLessonRepository,
		multiChoiceQuestionRepository,
	)
	toolService := impl.NewToolService()

	/* ROUTE */
	userRoute := router.NewUserRoute(userService)
	courseRoute := router.NewCourseRoute(courseService)
	courseMemberRoute := router.NewCourseMemberRoute(courseMemberService)
	multiChoiceLessonRoute := router.NewMultiChoiceLessonRoute(multiChoiceLessonService)
	toolRoute := router.NewToolRote(toolService)

	r := router.NewRouter(
		userRoute,
		courseRoute,
		courseMemberRoute,
		multiChoiceLessonRoute,
		toolRoute,
	)

	/* START APPLICATION */
	err := r.Run(":8080")
	if err != nil {
		return
	}
}
