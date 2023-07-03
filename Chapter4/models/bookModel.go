package models

type Books struct {
	ID            int `gorm:"primaryKey"`
	Judul         string
	Penulis       string
	Penerbit      string
	Tanggal_rilis string
}
