package service

type UserService interface {
	GetUsername() (*string, error)
}
