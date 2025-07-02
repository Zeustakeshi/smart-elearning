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

	/* SERVICE */
	jwtService := impl.NewJwtService()
	passwordService := impl.NewPasswordService()
	userService := impl.NewUserService(jwtService, userRepository, passwordService)
	courseService := impl.NewCourseService(courseRepository)
	courseMemberService := impl.NewCourseMemberService(courseRepository, courseMemberRepository, userRepository)

	/* ROUTE */
	userRoute := router.NewUserRoute(userService)
	courseRoute := router.NewCourseRoute(courseService)
	courseMemberRoute := router.NewCourseMemberRoute(courseMemberService)

	r := router.NewRouter(
		userRoute,
		courseRoute,
		courseMemberRoute,
	)

	/* START APPLICATION */
	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
