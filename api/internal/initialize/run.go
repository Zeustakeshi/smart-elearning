package initialize

import (
	"smart-elearning/internal/config"
	"smart-elearning/internal/database"
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

	/* ROUTE */
	userRoute := router.NewUserRoute(userService)
	courseRoute := router.NewCourseRoute(courseService)
	courseMemberRoute := router.NewCourseMemberRoute(courseMemberService)
	multiChoiceLessonRoute := router.NewMultiChoiceLessonRoute(multiChoiceLessonService)

	r := router.NewRouter(
		userRoute,
		courseRoute,
		courseMemberRoute,
		multiChoiceLessonRoute,
	)

	/* START APPLICATION */
	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
