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

	/* SERVICE */
	jwtService := impl.NewJwtService()
	passwordService := impl.NewPasswordService()
	userService := impl.NewUserService(jwtService, userRepository, passwordService)

	/* ROUTE */
	userRoute := router.NewUserRoute(userService)

	r := router.NewRouter(
		userRoute,
	)

	/* START APPLICATION */
	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
