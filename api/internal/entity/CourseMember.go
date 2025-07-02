package entity

import (
	"gorm.io/gorm"
	"time"
)

type CourseMember struct {
	gorm.Model
	CourseId   uint
	Course     *Course
	StudentId  uint
	Student    *User
	EnrolledOn *time.Time
}

func NewCourseMember(courseId uint, studentId uint) *CourseMember {
	now := time.Now()
	return &CourseMember{
		CourseId:   courseId,
		StudentId:  studentId,
		EnrolledOn: &now,
	}
}
