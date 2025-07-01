package impl

import (
	"golang.org/x/crypto/bcrypt"
)

type PasswordServiceImpl struct {
}

func NewPasswordService() *PasswordServiceImpl {
	return &PasswordServiceImpl{}
}

func (*PasswordServiceImpl) HashPassword(rawPassword string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(rawPassword), bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}
