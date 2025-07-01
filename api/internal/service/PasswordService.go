package service

type PasswordService interface {
	HashPassword(rawPassword string) (string, error)
}
