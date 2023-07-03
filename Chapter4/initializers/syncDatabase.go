package initializers

import "elib_v2/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Books{})
	DB.AutoMigrate(&models.Pinjam{})
}
