package router

import (
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/middleware"
)

func NewRouter(
	userRoute *UserRoute,
) *gin.Engine {

	var router = gin.New()

	/* GLOBAL MIDDLEWARE CONFIG */
	router.Use(middleware.ExceptionMiddleware)

	/* STUDENT  */
	studentGroup := router.Group("api/v1/student")
	{
		studentGroup.Use(middleware.SecurityMiddleWare)
		studentGroup.GET("test", userRoute.GetUsername)
		studentGroup.GET("user", userRoute.GetUser)
		studentGroup.GET("info", userRoute.GetUserInfo)
	}

	/* TEACHER  */
	teacherGroup := router.Group("/api/v1/teacher")
	{
		teacherGroup.Use(middleware.SecurityMiddleWare)
		teacherGroup.GET("test", userRoute.GetUsername)
	}

	return router
}
