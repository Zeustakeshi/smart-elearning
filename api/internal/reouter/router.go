package reouter

import (
	"github.com/gin-gonic/gin"
)

func NewRouter(
	userRoute *UserRoute,
) *gin.Engine {
	var router *gin.Engine = gin.New()

	/* STUDENT  */
	studentGroup := router.Group("api/v1/student")
	{
		studentGroup.GET("test", userRoute.GetUsername)
	}

	/* TEACHER  */
	teacherGroup := router.Group("/api/v1/teacher")
	{
		teacherGroup.GET("test", userRoute.GetUsername)
	}

	return router
}
