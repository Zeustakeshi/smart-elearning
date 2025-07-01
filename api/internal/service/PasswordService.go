package service

type PasswordService interface {
	HashPassword(rawPassword string) (string, error)
	Verify(rawPassword string, hashPassword string) bool
}
