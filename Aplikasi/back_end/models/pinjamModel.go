package models

type Pinjam struct {
	ID             int `gorm:"primaryKey"`
	UserID         int
	User           User
	BooksID        int
	Books          Books
	Tanggal_pinjam string
	Dikembalikan   bool
}
