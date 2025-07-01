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

	/* AUTH */
	authGroup := router.Group("/api/v1/auth")
	{
		authGroup.POST("register", userRoute.CreateUser)
	}

	/* STUDENT  */
	studentGroup := router.Group("api/v1/student")
	{
		studentGroup.Use(middleware.SecurityMiddleWare)
	}

	/* TEACHER  */
	teacherGroup := router.Group("/api/v1/teacher")
	{
		teacherGroup.Use(middleware.SecurityMiddleWare)
	}

	return router
}
