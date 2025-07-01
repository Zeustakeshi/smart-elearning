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

func (*PasswordServiceImpl) Verify(rawPassword string, hashPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(rawPassword))
	if err != nil {
		return false
	}
	return true
}
