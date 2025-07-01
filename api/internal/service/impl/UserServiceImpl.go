package impl

import (
	"errors"
	"smart-elearning/internal/common/constants"
	"smart-elearning/internal/config"
	"smart-elearning/internal/dto/request"
	"smart-elearning/internal/dto/response"
	"smart-elearning/internal/entity"
	"smart-elearning/internal/repository"
	"smart-elearning/internal/service"
	"smart-elearning/pkg/exception"
	responseStatus "smart-elearning/pkg/response"
)

type UserServiceImpl struct {
	jwtService      service.JwtService
	repository      *repository.UserRepository
	passwordService service.PasswordService
}

func NewUserService(
	jwtService service.JwtService,
	repository *repository.UserRepository,
	passwordService service.PasswordService,
) *UserServiceImpl {
	return &UserServiceImpl{
		repository:      repository,
		jwtService:      jwtService,
		passwordService: passwordService,
	}
}

func (userService *UserServiceImpl) CreateUser(request *request.CreateUserRequest) (*response.TokenResponse, error) {

	exists, err := userService.repository.ExistsByEmail(request.Email)

	if err != nil {
		return nil, exception.NewApiError(responseStatus.UNCATEGORIZED, err)
	}

	if exists {
		return nil, exception.NewApiError(responseStatus.EMAIL_ALREADY_EXISTED, errors.New(""))
	}

	if request.Type != constants.TEACHER && request.Type != constants.STUDENT {
		return nil, exception.NewApiError(responseStatus.INVALID_USER_TYPE, errors.New("invalid user type: "+request.Type))
	}

	var defaultAvatar string
	if request.Type == constants.STUDENT {
		defaultAvatar = config.Configs.Resources.DefaultAvatar.Student
	} else {
		defaultAvatar = config.Configs.Resources.DefaultAvatar.Teacher
	}
	tokenExpireIn := config.Configs.Jwt.ExpireTime

	hashPassword, err := userService.passwordService.HashPassword(request.Password)

	if err != nil {
		return nil, exception.NewApiError(responseStatus.UNCATEGORIZED, err)
	}

	user := userService.repository.Save(entity.NewUser(
		request.Email,
		request.Username,
		hashPassword,
		defaultAvatar, request.Type,
	))

	jwt, err := userService.jwtService.GenerateJwt(user)
	if err != nil {
		return nil, exception.NewApiError(responseStatus.GENERATE_TOKEN_FAILED, err)
	}

	return &response.TokenResponse{
		Value:    jwt,
		ExpireIn: tokenExpireIn,
	}, nil

}

func (userService *UserServiceImpl) Login(request *request.LoginRequest) (*response.TokenResponse, error) {
	user, err := userService.repository.FindByEmail(request.Email)

	if err != nil {
		return nil, exception.NewApiError(responseStatus.INVALID_EMAIL_OR_PASSWORD, err)
	}

	if !userService.passwordService.Verify(request.Password, user.Password) {
		return nil, exception.NewApiError(responseStatus.INVALID_EMAIL_OR_PASSWORD, err)
	}

	jwt, err := userService.jwtService.GenerateJwt(user)
	if err != nil {
		return nil, exception.NewApiError(responseStatus.GENERATE_TOKEN_FAILED, err)
	}

	tokenExpireIn := config.Configs.Jwt.ExpireTime

	return &response.TokenResponse{
		Value:    jwt,
		ExpireIn: tokenExpireIn,
	}, nil

}
