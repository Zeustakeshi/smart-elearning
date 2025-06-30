package initialize

import (
	"smart-elearning/internal/reouter"
	"smart-elearning/internal/service/impl"
)

func Run() {

	userService := impl.NewUserService()
	userRoute := reouter.NewUserRoute(userService)

	router := reouter.NewRouter(userRoute)

	err := router.Run("localhost:8080")
	if err != nil {
		return
	}
}
