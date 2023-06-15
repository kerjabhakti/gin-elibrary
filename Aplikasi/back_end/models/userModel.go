package models

type User struct {
	ID       int `gorm:"primaryKey"`
	Email    string
	Password string
	Name     string
}
