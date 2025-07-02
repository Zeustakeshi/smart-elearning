package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"smart-elearning/internal/middleware"
	"time"
)

func NewRouter(
	userRoute *UserRoute,
	courseRoute *CourseRoute,
	courseMemberRoute *CourseMemberRoute,
) *gin.Engine {

	var router = gin.New()

	/* GLOBAL MIDDLEWARE CONFIG */
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.Use(middleware.ExceptionMiddleware)

	/* AUTH */
	authGroup := router.Group("/api/v1/auth")
	{
		authGroup.POST("register", userRoute.CreateUser)
		authGroup.POST("login", userRoute.Login)
	}

	/* STUDENT  */
	studentGroup := router.Group("api/v1/student")
	{
		studentGroup.Use(middleware.SecurityMiddleWare)
		studentGroup.Use(middleware.StudentMiddleware)
		studentGroup.POST("courses/join", courseMemberRoute.JoinCourse)
	}

	/* TEACHER  */
	teacherGroup := router.Group("/api/v1/teacher")
	{
		teacherGroup.Use(middleware.SecurityMiddleWare)
		teacherGroup.Use(middleware.TeacherMiddleware)
		teacherGroup.POST("courses", courseRoute.CreateCourse)
		teacherGroup.GET("courses", courseRoute.GetAllCourse)
		teacherGroup.GET("courses/:courseId/members", courseMemberRoute.GetAllCourseMember)
	}

	return router
}
