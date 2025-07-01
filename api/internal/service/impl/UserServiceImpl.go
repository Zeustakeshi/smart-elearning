package impl

import (
	"errors"
	"smart-elearning/internal/database"
	"smart-elearning/internal/entity"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/response"
)

type UserServiceImpl struct {
}

func NewUserService() *UserServiceImpl {
	return &UserServiceImpl{}
}

func (userService *UserServiceImpl) GetUsername() (*string, error) {

	newUser := entity.User{Username: "john.doe", Password: "secure_password", Avatar: "avatar1.png"}

	database.DB.Create(&newUser)

	print(newUser.Username)

	return nil, exception.NewApiError(response.USER_NOT_FOUND, errors.New("Test"))

}

func (userService *UserServiceImpl) GetUser() (*entity.User, error) {
	var user *entity.User

	database.DB.First(&user)

	return user, nil
}
