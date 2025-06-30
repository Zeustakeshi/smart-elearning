package impl

import (
	"errors"
	"smart-elearning/pkg/exception"
	"smart-elearning/pkg/response"
)

type UserServiceImpl struct {
}

func NewUserService() *UserServiceImpl {
	return &UserServiceImpl{}
}

func (userService *UserServiceImpl) GetUsername() (*string, error) {

	return nil, exception.NewApiError(response.USER_NOT_FOUND, errors.New("Test"))

}
