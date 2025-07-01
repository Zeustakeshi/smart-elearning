package entity

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	Code        string
	Name        string
	Description string
	Avatar      string
	Background  string
	TeacherId   uint
	Teacher     User
	Visibility  string
}
