package controllers

import (
	"elib_v2/initializers"
	"elib_v2/models"

	"github.com/gin-gonic/gin"
)

func Pinjam(c *gin.Context) {
	var pinjam []models.Pinjam
	initializers.DB.Find(&pinjam)

	c.JSON(200, pinjam)
}

func GetPinjamid(c *gin.Context) {
	id := c.Param("id")

	var pinjam models.Pinjam
	initializers.DB.Find(&pinjam, id)

	c.JSON(200, pinjam)
}

func AddPinjam(c *gin.Context) {
	// ambil data
	var body struct {
		UserID         int
		BooksID        int
		Tanggal_pinjam string
		Dikembalikan   bool
	}

	c.Bind(&body)

	//tambah buku
	pinjam := models.Pinjam{UserID: body.UserID, BooksID: body.BooksID, Tanggal_pinjam: body.Tanggal_pinjam, Dikembalikan: body.Dikembalikan}
	result := initializers.DB.Create(&pinjam)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"pinjaman": pinjam,
	})

}

func UpdatePinjam(c *gin.Context) {
	id := c.Param("id")

	// ambil data request
	var body struct {
		UserID         int
		BooksID        int
		Tanggal_pinjam string
		Dikembalikan   bool
	}

	c.Bind(&body)

	//ambil post update
	var pinjam models.Pinjam
	initializers.DB.First(&pinjam, id)

	//update
	initializers.DB.Model(&pinjam).Updates(models.Pinjam{
		UserID:         body.UserID,
		BooksID:        body.BooksID,
		Tanggal_pinjam: body.Tanggal_pinjam,
		Dikembalikan:   body.Dikembalikan,
	})

	//respon
	c.JSON(200, gin.H{
		"message": pinjam,
	})
}

func DeletePinjam(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Delete(&models.Pinjam{}, id)

	//respon
	c.JSON(200, gin.H{
		"message": "Pinjaman terhapus!",
	})
}
