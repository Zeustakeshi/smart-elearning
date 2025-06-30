package impl

type UserServiceImpl struct {
}

func NewUserService() *UserServiceImpl {
	return &UserServiceImpl{}
}

func (userService *UserServiceImpl) GetUsername() string {
	return "Minh Hiếu"
}
